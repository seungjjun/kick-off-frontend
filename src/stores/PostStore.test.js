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

  describe('write post', () => {
    context('게시글을 작성할 경우', () => {
      it('게시글의 정보를 확인할 수 있다.', async () => {
        const title = '카타르 월드컵 4강 진출';
        const content = '대한민국 20년만에 월드컵 4강 진출';
        const category = '전체 게시판';

        await postStore.write(title, content, category);

        expect(postStore.category).toBe('전체 게시판');
      });
    });
  });
});
