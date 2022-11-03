import CommentStore from './CommentStore';

const context = describe;

describe('CommentStore', () => {
  let commentStore;

  beforeEach(() => {
    commentStore = new CommentStore();
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
        await commentStore.fetchComment(1);

        expect(commentStore.recomments[0].id).toBe(1);
        expect(commentStore.recomments[0].content).toBe('첫번째 게시글의 댓글의 대댓글');
      });
    });
  });
});
