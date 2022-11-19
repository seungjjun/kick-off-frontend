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
});
