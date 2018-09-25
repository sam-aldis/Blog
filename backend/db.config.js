const settings = {
    db_user : "",
    db_pass : "",
    db_addr : "mongodb://127.0.0.1/blog",
}

var Post = {
    _id : "",
    id : "",
    title : "",
    subtitle : "",
    headerImage : "",
    profileImage : "",
    author : "",
    date : "",
    dbdate : "",
    body : "",
    published : false,
    tags : [],
}

module.exports = {
    Post : Post,
    Settings : settings,
}