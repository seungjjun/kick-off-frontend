const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  settingPostsTen() {
    this.amOnPage(`${backdoorBaseUrl}/setting-posts10`);
  },

  settingPosts() {
    this.amOnPage(`${backdoorBaseUrl}/setting-posts`);
  },

  settingRecomments() {
    this.amOnPage(`${backdoorBaseUrl}/setting-recomments`);
  },

  settingSearchedPosts() {
    this.amOnPage(`${backdoorBaseUrl}/setting-searchedPosts`);
  },

  login() {
    this.amOnPage('/login');

    this.fillField('#input-userId', 'jel1y');
    this.fillField('#input-password', 'Qwe1234!');
    this.click('[type=submit]');
  },

  login2() {
    this.amOnPage('/login');

    this.fillField('#input-userId', 'stw550');
    this.fillField('#input-password', 'Qwe1234!');
    this.click('[type=submit]');
  },
});
