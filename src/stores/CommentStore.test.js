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

  describe('createComment', () => {
    context('when write comment successfully', () => {
      it('create comment', async () => {
        const content = '댓글';
        const postId = 1;
        const userId = 1;

        await commentStore.createComment(content, postId, userId);
      });
    });

    context('when write comment fail', () => {
      it('check content errorMessage', async () => {
        const content = '';
        const postId = 1;
        const userId = 1;

        await commentStore.createComment(content, postId, userId);

        expect(commentStore.errorMessage).toBe('내용을 입력해주세요.');
      });

      it('check postId errorMessage', async () => {
        const content = '댓글';
        const postId = 0;
        const userId = 1;

        await commentStore.createComment(content, postId, userId);

        expect(commentStore.errorMessage).toBe('게시글을 찾을 수 없습니다.');
      });

      it('check userId errorMessage', async () => {
        const content = '댓글';
        const postId = 1;
        const userId = 0;

        await commentStore.createComment(content, postId, userId);

        expect(commentStore.errorMessage).toBe('사용자를 찾을 수 없습니다.');
      });
    });
  });

  describe('createRecomment', () => {
    context('when write recomment successfully', () => {
      it('create recomment', async () => {
        const content = '대댓글';
        const commentId = 1;
        const postId = 1;
        const userId = 1;

        await commentStore.createRecomment(content, commentId, postId, userId);
      });
    });

    context('when write recomment fail', () => {
      it('check content errorMessage', async () => {
        const content = '';
        const commentId = 1;
        const postId = 1;
        const userId = 1;

        await commentStore.createRecomment(content, commentId, postId, userId);

        expect(commentStore.errorMessage).toBe('내용을 입력해주세요.');
      });

      it('check commentId errorMessage', async () => {
        const content = '대댓글';
        const commentId = 0;
        const postId = 1;
        const userId = 1;

        await commentStore.createRecomment(content, commentId, postId, userId);

        expect(commentStore.errorMessage).toBe('댓글을 찾을 수 없습니다.');
      });

      it('check postId errorMessage', async () => {
        const content = '댓글';
        const commentId = 1;
        const postId = 1;
        const userId = 0;

        await commentStore.createRecomment(content, commentId, postId, userId);

        expect(commentStore.errorMessage).toBe('사용자를 찾을 수 없습니다.');
      });
    });
  });
});
