const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  settingPostsTen() {
    this.amOnPage(`${backdoorBaseUrl}/setting-posts-ten`);
  },

  settingPosts() {
    this.amOnPage(`${backdoorBaseUrl}/setting-posts`);
  },

  settingRecomments() {
    this.amOnPage(`${backdoorBaseUrl}/setting-recomments`);
  },
});
