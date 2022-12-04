import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import Comment from './Comment';

const changeCommentNumber = jest.fn();

const changeRecommentFormState = jest.fn();

const deleteComment = jest.fn();

const deleteRecomment = jest.fn();

const modifyComment = jest.fn();

const modifyRecomment = jest.fn();

const changeRecommentEditState = jest.fn();

const submitComment = jest.fn();

const submitRecomment = jest.fn();

const navigate = jest.fn();

const context = describe;

describe('comment', () => {
  beforeEach(() => {
    const posts = {
      post: {
        postInformation: {
          title: '이강인 손흥민과 한 팀??',
          content: '이강인 토트넘 이적 루머',
        },
        hit: 50,
        createdAt: '2022-10-31',
      },

      category: {
        name: 'SerieA',
      },

      users: [
        {
          id: 1,
          identification: 'jel1y',
          name: '장어',
          profileImage: '장어 이미지',
        },
      ],

      likes: [
        {
          id: 1,
          length: 1,
        },
      ],

      comments: [
        {
          id: 1,
          userId: 1,
          postId: 3,
          content: '3번째 게시글의 댓글',
          deleted: false,
        },
      ],

      recomments: [
        {
          id: 1,
          userId: 1,
          postId: 3,
          commentId: 1,
          content: '3번째 게시글의 1번째 댓글의 대댓글',
        },
      ],

      loginUser: {
        id: 1,
        identification: 'jel1y',
        name: '이강인',
      },
    };

    const comments = {
      submitComment,
      recommentVisibleState: 2,
      modifyComment,
      deleteComment,
    };

    const recomments = {
      submitRecomment,
      changeRecommentFormState,
      changeRecommentEditState,
      recommentEditState: 1,
      deleteRecomment,
      modifyRecomment,
    };

    const pages = {
      isPreviousPage: true,
      isNextPage: true,
      pageButtons: [1, 2, 3, 4, 5],
      changeCommentNumber,
    };

    const accessToken = 'ACCESS.TOKEN';

    render(<Comment
      posts={posts}
      pages={pages}
      comments={comments}
      recomments={recomments}
      accessToken={accessToken}
      navigate={navigate}
    />);
  });

  it('render comment', () => {
    screen.getByText('3번째 게시글의 댓글');
  });

  it('render recomment', () => {
    screen.getByText('3번째 게시글의 1번째 댓글의 대댓글');
  });

  it('render submit button', () => {
    screen.getByText('등록');
  });

  it('create comment', async () => {
    fireEvent.change(screen.getByLabelText('댓글', {
      target: { value: '댓글' },
    }));

    fireEvent.click(screen.getByText('등록'));

    await waitFor(() => {
      expect(submitComment).toBeCalled();
    });
  });

  it('render recomment button', () => {
    screen.getByText('답글쓰기');
  });

  it('click recomment button', () => {
    fireEvent.click(screen.getByText('답글쓰기'));

    expect(changeRecommentFormState).toBeCalled();
  });

  it('render comment button', () => {
    screen.getByText('1');
    screen.getByText('2');
    screen.getByText('3');
    screen.getByText('4');
    screen.getByText('5');
  });

  context('when click comment button', () => {
    it('change comment button', () => {
      fireEvent.click(screen.getByText('1'));

      expect(changeCommentNumber).toBeCalled();
    });
  });

  it('render next page button', () => {
    screen.getByText('다음');
  });

  it('render previous page button', () => {
    screen.getByText('이전');
  });

  context('when comment delete', () => {
    it('deleteComment to be called', () => {
      fireEvent.click(screen.getAllByText('삭제')[0]);

      expect(deleteComment).toBeCalled();
    });
  });

  context('when recomment delete', () => {
    it('deleteRecomment to be called', () => {
      fireEvent.click(screen.getAllByText('삭제')[1]);

      expect(deleteRecomment).toBeCalled();
    });
  });
});
