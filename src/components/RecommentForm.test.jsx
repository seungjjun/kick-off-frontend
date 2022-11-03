import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import RecommentForm from './RecommentForm';

const changeRecommentFormState = jest.fn();
const submitRecomment = jest.fn();

const context = describe;

describe('RecommentForm', () => {
  beforeEach(() => {
    const commentId = 1;

    const userName = 'sony';

    render(<RecommentForm
      changeRecommentFormState={changeRecommentFormState}
      submitRecomment={submitRecomment}
      commentId={commentId}
      userName={userName}
    />);
  });

  it('render input', () => {
    screen.getByPlaceholderText('댓글을 입력하세요');
  });

  it('render submit button', () => {
    screen.getByText('등록');
  });

  it('render cancel button', () => {
    screen.getByText('취소');
  });

  it('render user nickname', () => {
    screen.getByText('sony');
  });

  context('when click cancel button', () => {
    it('changeRecommentFormState', () => {
      fireEvent.click(screen.getByText('취소'));

      expect(changeRecommentFormState).toBeCalled();
    });
  });

  context('when submit recomment', () => {
    it('call submit recomment', async () => {
      fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요', {
        target: { value: '댓글입니다' },
      }));

      fireEvent.click(screen.getByText('등록'));

      await waitFor(() => {
        expect(submitRecomment).toBeCalled();
      });
    });
  });
});
