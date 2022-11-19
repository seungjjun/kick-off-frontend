import PostStore from './PostStore';

const context = describe;

describe('PostStore', () => {
  let postStore;

  beforeEach(() => {
    postStore = new PostStore();
  });

  describe('writePost', () => {
    context('게시글을 작성할 경우', () => {
      it('게시글이 작성된것을 확인할 수 있다.', async () => {
        const title = '카타르 월드컵 4강 진출';
        const content = '대한민국 20년만에 월드컵 4강 진출';
        const categoryId = 1;
        const image = 'imageUrl';
        const userId = 5;

        await postStore.write(title, content, categoryId, image, userId);

        expect(postStore.postId).toBe(5);
      });
    });
  });

  describe('fetchPost', () => {
    context('특정한 게시글의 정보를 불러올 경우', () => {
      it('게시글의 세부 페이지를 확인 할 수 있다.', async () => {
        await postStore.fetchPost(1);

        const { post } = postStore.post;

        expect(post.postInformation.title).toBe('대만힌국 16강 진출');
        expect(post.postInformation.content).toBe('카타르 월드컵 대한민국 16강 진출');
        expect(post.board.boardName.value).toBe('전체게시판');
        expect(post.hit).toBe(10);
      });
    });
  });
});
