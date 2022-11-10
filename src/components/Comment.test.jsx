import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import Comment from './Comment';

const submitComment = jest.fn();

const changeRecommentFormState = jest.fn();

const submitRecomment = jest.fn();

const changeCommentNumber = jest.fn();

const context = describe;

describe('comment', () => {
  beforeEach(() => {
    const comments = [
      {
        id: 1,
        userId: 1,
        postId: 3,
        content: '3번째 게시글의 댓글',
      },
    ];

    const recomments = [
      {
        id: 1,
        userId: 1,
        postId: 3,
        commentId: 1,
        content: '3번째 게시글의 1번째 댓글의 대댓글',
      },
    ];

    const users = [
      {
        id: 1,
        identification: 'jel1y',
        name: '장어',
        profileImage: '장어 이미지',
      },
    ];

    const isPreviousPage = true;

    const isNextPage = true;

    const recommentVisibleState = 2;

    const pageButtons = [1, 2, 3, 4, 5];

    render(<Comment
      comments={comments}
      recomments={recomments}
      users={users}
      submitComment={submitComment}
      recommentVisibleState={recommentVisibleState}
      changeRecommentFormState={changeRecommentFormState}
      submitRecomment={submitRecomment}
      changeCommentNumber={changeCommentNumber}
      isPreviousPage={isPreviousPage}
      isNextPage={isNextPage}
      pageButtons={pageButtons}
    />);
  });

  it('render author, comment', () => {
    screen.getByText('장어 3번째 게시글의 댓글');
  });

  it('render recomment', () => {
    screen.getByText('장어 3번째 게시글의 1번째 댓글의 대댓글');
  });

  it('render submit button', () => {
    screen.getByText('등록');
  });

  it('create comment', async () => {
    fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요', {
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
});
