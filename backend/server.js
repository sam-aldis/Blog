var express = require('express');
var fs = require('fs');
var cors = require('cors');
var https = require('https');
var mongo = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db_config = require('./db.config');

var md5 = require('md5');

var app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/publisher/'))
const port = 6565;

// Session and login details
const session = "c2aecf90438f1a33de4757db2691086c";
const extra = "4b42e4a06b193a7106:LLa64Rbc_23";

// Database settings
const db_user = db_config.Settings.db_user;
const db_pass = db_config.Settings.db_pass;
const db_addr = db_config.Settings.db_addr;
console.log(db_addr);

// Server settings
// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/service.ukjp-design.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/service.ukjp-design.com/cert.pem')
// }

function checkToken(token) {
    if(!token) return { valid : false };
    token = token.replace(extra, '');
    if(token === session) {
        return { valid : true };
    } 
    return { valid : false };
}

function checkLogin(username, password) {
    if(!username || !password) return { valid : false };
    user = username.replace(' ', '');
    if(md5(password + user) == session) {
        return {
            valid : true,
            username : username,
            level : 0,
            token : session + extra
        }
    }
    return {
        valid : false
    }
}
function getNextId() {
    var count = 0;
    return new Promise((resolve, reject) => { 
        mongo.connect(db_addr, (err,db) =>  {
            if(err) throw err;
            var col = db.collection('posts');
            var cur = col.find({}, {id : 1});
            cur.forEach((item) => {
                count += 1;
            }, () => { 
                resolve(count + 1);
            });
        });
    });
}

function getPostsForTag(tag,page) {
    return new Promise((resolve, reject) => {
        var response = [];
        mongo.connect(db_addr, (err,db) => {
            var col = db.collection('posts');
            var cur = col.find({tags : tag});
            cur.sort({id : -1});
            cur.count().then((count) => response.push({count:count}));
            cur.sort({id : -1});
            cur.skip(page * 5);
            cur.limit(5);
            cur.forEach((post) => {
                response.push(post);
            }, () => {
                resolve(response);
            });
        });
    });
}

function getTags() {
    return new Promise((resolve, reject) => {
        var response = [];
        mongo.connect(db_addr, (err, db) => {
            var col = db.collection('tags');
            var cur = col.find({});
            cur.sort({count : -1});
            cur.forEach((tag) => {
                response.push(tag);
            }, ()=>{resolve(response)});
        })
    })
}

function addTags(tags) {
    return new Promise((resolve, reject) => {
        mongo.connect(db_addr, (err,db) => {
            var col = db.collection('tags');
            tags.forEach((tag) => {
                if(tag !== '' || tag !== null || tag !== undefined) {
                    var cur = col.find({tag : tag});
                    cur.count().then((count) => {
                        if(count === 0) {
                            col.insert({_id : md5(tag), count : 1, tag : tag});
                        }  else {
                            col.update({tag : tag}, { "$inc" : { count : 1 }});
                        }
                    }, (err) => {
                        console.log(err);
                    });
                }
            })
        })
    })
}

function addPost(post_data){
    return new Promise( (resolve, reject) => {
        getNextId().then((nextid) => {
            post_data.id = nextid;
            post_data._id = md5(nextid);
            if(post_data.tags) {
                addTags(post_data.tags);
            }
            mongo.connect(db_addr, (err,db) => {
                if(err) reject(err);
                var col = db.collection('posts');
                var cur = col.insert(post_data);
                resolve(cur);
                cur.then((ret)=> {
                    if(ret.insertedCount===0) {
                        reject('Nothing inserted!')
                    }
                })
            });
        });
    })
}

function validateLogin(req,res) {
    const token = req.cookies.session;
    if(token === undefined || !token) {
        res.redirect('/login');
    } else {
        if(checkToken(token)) {
            return true;
        } else {
            console.log("invalid token!");
            res.redirect('/login');
            res.close();
            return false;
        }
    }
}

app.post('/blog/new/post', (req, res) => {
    var isLoggedIn = checkToken(req.cookies.session);
    if(isLoggedIn) {
        let post = db_config.Post;
        post.published = req.body.published;
        post.author = req.body.author;
        post.body = req.body.body;
        post.dbdate = Date.now();
        post.date = Date();
        post.headerImage = (req.body.headerImage) ? req.body.headerImage : "";
        post.profileImage = (req.body.profileImage) ? req.body.profileImage : "";
        post.subtitle = req.body.subtitle;
        post.tags = req.body.tags;
        post.title = req.body.title;
        addPost(post).then((result)=> { }, (err)=> {
            console.log(err);
            res.send({code : 500 });
            res.end();
        });
        if(res) {
            res.send({ code : 200 });
            res.end();
        }
    }
})

app.post('/login/get_token', (req,res) => {
    var data = req.body;
    rdata = checkLogin(data.username, data.password);
    res.send(rdata);
    res.end();
});

app.post('/login/check', (req, res) => {
    var data = req.body;
    rdata = checkToken(data.token);
    res.send(rdata);
    res.end();
});

app.get('/blog/tags', (req,res) => {
    getTags().then((response) => {
        res.send(response);
        res.end();
    });
});

app.get('/blog/tag/:tag/:page', (req, res) => {
    var tag = req.params.tag;
    var page = req.params.page;
    getPostsForTag(tag,page).then((response) => {
        console.log(response);
        res.send(response);
        res.end();
    })
})

app.get('/blog/posts/:page', (req,res) => {
    var response = [];
    var page = req.params.page;
    new Promise((resolve, reject) => {mongo.connect(db_config.Settings.db_addr, (err, db)=> {
        var col = db.collection('posts');
        var cur = col.find({published:true});
        cur.count().then((count) => response.push({count:count}));
        cur.sort({id : -1});
        cur.skip(page * 5);
        cur.limit(5);
        cur.forEach((post) => {
            response.push(post);
        }, () => {
            resolve(response)
        });
    })}).then((response)=>{
        res.send(response);
        res.end();
    });
});

app.get('/blog/post/:id', (req, res) =>{
    var post_id = req.params.id;
    var response;
    new Promise((resolve, reject) => {
        mongo.connect(db_addr, (err, db) => {
            var col = db.collection('posts');
            var cur = col.findOne({id : parseInt(post_id)},(doc,err) => {
                response = (doc) ? doc : err;
                resolve(response);
            });
        })
    }).then((response) => {        
        res.send(response); 
        res.end();
    });
});

app.get('/login', (req,res) => {
    res.setHeader("Content-Type", "text/html");
    var reader = fs.readFileSync(__dirname + '/publisher/index.html');
    res.send(reader);
});

app.get('/*', (req, res) => {
    let loggedIn = validateLogin(req,res);
    if(loggedIn){
        res.setHeader("Content-Type", "text/html");
        var reader = fs.readFileSync(__dirname + '/publisher/index.html');
        res.send(reader);
    }
});

//var server = https.createServer(options,app).listen(port, ()=>{console.log('server started')});
app.listen(port, ()=>{console.log('server started');});