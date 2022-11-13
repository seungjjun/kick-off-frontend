import { fireEvent, render, screen } from '@testing-library/react';

import CommentEditForm from './CommentEditForm';

const modifyComment = jest.fn();

const changeCommentEditState = jest.fn();

const context = describe;

describe('CommentEditForm', () => {
  beforeEach(() => {
    const commentId = 1;
    const initialContent = '댓글 수정 테스트';

    render(<CommentEditForm
      commentId={commentId}
      initialContent={initialContent}
      modifyComment={modifyComment}
      changeCommentEditState={changeCommentEditState}
    />);
  });

  it('render comment edit form', () => {
    screen.getByDisplayValue('댓글 수정 테스트');
  });

  it('render modify button', () => {
    screen.getByText('수정완료');
  });

  context('when click modify button', () => {
    it('comment modify', () => {
      fireEvent.change(screen.getByDisplayValue('댓글 수정 테스트'), {
        target: { value: '댓글 수정' },
      });

      fireEvent.click(screen.getByText('수정완료'));

      expect(modifyComment).toBeCalled();
    });
  });

  context('when click modify cancel button', () => {
    it('cancel comment modify', () => {
      fireEvent.click(screen.getByText('취소'));

      expect(changeCommentEditState).toBeCalled();
    });
  });
});
