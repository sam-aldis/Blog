import { UkjpBlogPage } from './app.po';

describe('ukjp-blog App', () => {
  let page: UkjpBlogPage;

  beforeEach(() => {
    page = new UkjpBlogPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
