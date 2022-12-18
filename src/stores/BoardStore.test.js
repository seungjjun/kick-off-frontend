import BoardStore from './BoardStore';

const context = describe;

describe('BoardStore', () => {
  let boardStore;

  beforeEach(() => {
    boardStore = new BoardStore();
  });

  describe('fetchBoards', () => {
    context('게시판 리스트를 불러오는 경우', () => {
      it('모든 게시판의 이름을 확인할 수 있다.', async () => {
        await boardStore.fetchBoards();

        const { boards } = boardStore;

        expect(boards[0].boardName.value).toBe('전체게시판');
        expect(boards[1].boardName.value).toBe('EPL');
        expect(boards[2].boardName.value).toBe('SerieA');
      });
    });
  });

  describe('fetchPosts', () => {
    context('게시글을 불러올 경우', () => {
      it('게시글의 정보를 확인할 수 있다.', async () => {
        await boardStore.fetchPosts();

        const { posts } = boardStore;

        expect(posts.posts[0].postInformation.title).toBe('손흥민 득점왕');
        expect(posts.boards[0].boardName.value).toBe('EPL');
        expect(posts.users[0].name).toBe('son7');
        expect(posts.comments.length).toBe(2);
        expect(posts.likes.length).toBe(1);
      });
    });

    context('게시글이 10개가 넘어 페이지가 나뉘는 경우', () => {
      beforeEach(async () => {
        await boardStore.fetchPosts();
      });

      it('게시글의 총 갯수를 확인할 수 있다.', async () => {
        const { page } = boardStore;

        expect(page[0].totalPageNumber).toBe(21);
      });

      it('게시글의 마지막 페이지의 수를 확인할 수 있다.', () => {
        const { page } = boardStore;

        expect(page[0].lastPage).toBe(3);
      });
    });
  });

  describe('hotPosts', () => {
    context('인기 게시글을 불러오는 경우', () => {
      it('조회수가 가장 높은 게시글 3개를 확인할 수 있다.', async () => {
        await boardStore.fetchHotPosts();

        const { hotPosts } = boardStore;

        expect(hotPosts[0].posts.postInformation.title).toBe('인기 게시글');
        expect(hotPosts[1].posts.postInformation.title).toBe('손흥민 득점왕');
        expect(hotPosts[2].posts.postInformation.title).toBe('벤투 떠난다..');
      });
    });
  });

  describe('searchPosts', () => {
    context('게시글을 제목을 기준으로 검색할 경우', () => {
      it('검색한 게시글을 확인할 수 있다', async () => {
        await boardStore.searchPosts('16강', 1, 1);

        const { posts } = boardStore;

        expect(posts.posts[0].postInformation.title).toBe('대한민국 16강 경우의 수...');
      });
    });

    context('게시글을 내용을 기준으로 검색할 경우', () => {
      it('검색한 게시글을 확인할 수 있다', async () => {
        await boardStore.searchPosts('포르투갈', 1, 1);

        const { posts } = boardStore;

        expect(posts.posts[0].postInformation.content).toBe('포르투갈전 무조건 이겨야..');
      });
    });

    context('게시글을 작성자를 기준으로 검색할 경우', () => {
      it('검색한 게시글을 확인할 수 있다', async () => {
        await boardStore.searchPosts('벤투', 1, 1);

        const { posts } = boardStore;

        expect(posts.posts[0].postInformation.title).toBe('대한민국 16강 경우의 수...');
        expect(posts.posts[0].postInformation.content).toBe('포르투갈전 무조건 이겨야..');
      });
    });
  });
});
