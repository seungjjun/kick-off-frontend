import PostStore from './PostStore';

const context = describe;

describe('PostStore', () => {
  let postStore;

  beforeEach(() => {
    postStore = new PostStore();
  });

  describe('fetchPost', () => {
    context('게시글을 하나 불러올 경우', () => {
      it('게시글의 정보를 확인할 수 있다.', async () => {
        await postStore.fetchPosts();

        expect(postStore.posts[0].title).toBe('손흥민 득점왕 수상');
        expect(postStore.posts[0].category).toBe('EPL');
        expect(postStore.posts[0].author).toBe('굉민재');
        expect(postStore.posts[0].commentNumber).toBe(3);
        expect(postStore.posts[0].like).toBe(20);
      });
    });
  });
});
