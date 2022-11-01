import PostStore from './PostStore';

const context = describe;

describe('PostStore', () => {
  let postStore;

  beforeEach(() => {
    postStore = new PostStore();
  });

  describe('fetchPosts', () => {
    context('게시글을 불러올 경우', () => {
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

  describe('writePost', () => {
    context('게시글을 작성할 경우', () => {
      it('게시글이 작성된것을 확인할 수 있다.', async () => {
        const title = '카타르 월드컵 4강 진출';
        const content = '대한민국 20년만에 월드컵 4강 진출';
        const categoryId = 1;
        const image = 'imageUrl';
        const userId = 1;

        await postStore.write(title, content, categoryId, image, userId);

        expect(postStore.post.title).toBe('카타르 월드컵 4강 진출');
        expect(postStore.post.content).toBe('대한민국 20년만에 월드컵 4강 진출');
      });
    });
  });

  describe('fetchPost', () => {
    context('특정한 게시글의 정보를 불러올 경우', () => {
      it('게시글의 세부 페이지를 확인 할 수 있다.', async () => {
        await postStore.fetchPost(1);

        expect(postStore.post.title).toBe('대만힌국 16강 진출');
        expect(postStore.post.content).toBe('카타르 월드컵 대한민국 16강 진출');
        expect(postStore.post.author).toBe('jel1y');
        expect(postStore.post.category).toBe('EPL');
        expect(postStore.post.hit).toBe(1);
      });
    });
  });
});
