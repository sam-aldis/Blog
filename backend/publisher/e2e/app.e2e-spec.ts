import { PublisherPage } from './app.po';

describe('publisher App', () => {
  let page: PublisherPage;

  beforeEach(() => {
    page = new PublisherPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
