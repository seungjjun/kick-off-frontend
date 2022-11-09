import LikeStore from './LikeStore';

describe('LikeStore', () => {
  let likeStore;

  beforeEach(() => {
    likeStore = new LikeStore();
  });

  describe('fetchLikes', () => {
    it('좋아요를 누른 유저의 아이디를 알 수 있다.', async () => {
      await likeStore.fetchLike();

      expect(likeStore.likes[0].userId).toBe(1);
    });

    it('좋아요가 눌린 게시글의 번호를 알 수 있다.', async () => {
      await likeStore.fetchLike();

      expect(likeStore.likes[0].postId).toBe(20);
    });
  });
});
