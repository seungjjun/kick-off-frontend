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

        const posts = postStore.posts[0];

        expect(posts.posts[0].title).toBe('손흥민 득점왕');
        expect(posts.categories.name).toBe('EPL');
        expect(posts.users[0].name).toBe('son7');
        expect(posts.comments.length).toBe(2);
        expect(posts.likes.length).toBe(1);
      });
    });

    context('게시글이 10개가 넘어 페이지가 나뉘는 경우', () => {
      beforeEach(async () => {
        await postStore.fetchPosts();
      });

      it('게시글의 총 갯수를 확인할 수 있다.', async () => {
        const { page } = postStore;

        expect(page[0].totalPageNumber).toBe(21);
      });

      it('게시글의 마지막 페이지의 수를 확인할 수 있다.', () => {
        const { page } = postStore;

        expect(page[0].lastPage).toBe(3);
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
        const userId = 5;

        await postStore.write(title, content, categoryId, image, userId);

        // expect(postStore.postId).toBe(5);
        // expect(postStore.post.content).toBe('대한민국 20년만에 월드컵 4강 진출');
      });
    });
  });

  describe('fetchPost', () => {
    context('특정한 게시글의 정보를 불러올 경우', () => {
      it('게시글의 세부 페이지를 확인 할 수 있다.', async () => {
        await postStore.fetchPost(1);

        expect(postStore.post.title).toBe('대만힌국 16강 진출');
        expect(postStore.post.content).toBe('카타르 월드컵 대한민국 16강 진출');
        expect(postStore.category.name).toBe('EPL');
        expect(postStore.post.hit).toBe(10);
      });
    });
  });

  describe('fetchCategoryPosts', () => {
    context('특정 카테고리의 게시글만 불러올 경우', () => {
      beforeEach(async () => {
        await postStore.fetchCategoryPosts(3, 1);
      });

      it('게시글의 정보를 확인할 수 있다.', async () => {
        const { posts } = postStore;

        expect(posts[0].categories.name).toBe('LaLiga');
        expect(posts[0].posts[0].title).toBe('이강인 라리가 베스트 일레븐');
        expect(posts[0].posts[0].hit).toBe(10);
      });

      it('현재 페이지를 확인할 수 있다', () => {
        const { page } = postStore;

        expect(page[0].currentPageNumber).toBe(1);
      });
    });
  });
});
