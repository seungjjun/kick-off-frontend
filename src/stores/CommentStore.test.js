import CommentStore from './CommentStore';

const context = describe;

describe('CommentStore', () => {
  let commentStore;

  beforeEach(() => {
    commentStore = new CommentStore();
  });

  describe('fetch all comments', () => {
    context('when fetch total posts', () => {
      it('render all comment', async () => {
        await commentStore.fetchComments();

        expect(commentStore.comments[0].content).toBe('댓글이다');
        expect(commentStore.comments[0].commentDate).toBe('2022-10-30');
      });

      it('render all recomment', async () => {
        await commentStore.fetchRecomments();

        expect(commentStore.recomments[0].content).toBe('대댓글이다');
      });
    });
  });

  describe('fetchComments', () => {
    context('when render first post', () => {
      it('render comments of first post', async () => {
        await commentStore.fetchComment(1);

        expect(commentStore.comments[0].id).toBe(1);
        expect(commentStore.comments[0].content).toBe('첫번째 게시글의 댓글');
        expect(commentStore.comments[0].commentDate).toBe('2022-10-31');
      });

      it('render recomment of first post', async () => {
        await commentStore.fetchRecomment(1);

        expect(commentStore.recomments[0].id).toBe(1);
        expect(commentStore.recomments[0].content).toBe('첫번째 게시글의 댓글의 대댓글');
      });

      it('render total comment number', async () => {
        await commentStore.fetchComment(1, 1);

        const { page } = commentStore;
        expect(page[0].totalPageNumber).toBe(5);
      });
    });
  });
});
