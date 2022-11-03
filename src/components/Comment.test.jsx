import { fireEvent, render, screen } from '@testing-library/react';

import Comment from './Comment';

const submitComment = jest.fn();

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

    render(<Comment
      comments={comments}
      recomments={recomments}
      users={users}
      submitComment={submitComment}
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

  it('create comment', () => {
    fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요', {
      target: { value: '댓글' },
    }));

    fireEvent.click(screen.getByText('등록'));

    // expect(submitComment).toBeCalled();
  });
});
