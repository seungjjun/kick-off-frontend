import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import RecommentEditForm from './RecommentEditForm';

const modifyRecomment = jest.fn();

const changeRecommentEditState = jest.fn();

const context = describe;

describe('RecommentEditForm', () => {
  beforeEach(() => {
    const recommentId = '1';

    const initialContent = '수정전 대댓글';

    render(<RecommentEditForm
      recommentId={recommentId}
      initialContent={initialContent}
      modifyRecomment={modifyRecomment}
      changeRecommentEditState={changeRecommentEditState}
    />);
  });

  it('render initial recomment content', () => {
    screen.getByDisplayValue('수정전 대댓글');
  });

  context('when recomment modify', () => {
    it('render modified recomment', async () => {
      fireEvent.change(screen.getByDisplayValue('수정전 대댓글'), {
        target: { value: '대댓글 수정' },
      });

      fireEvent.click(screen.getByText('수정완료'));

      await waitFor(() => {
        expect(modifyRecomment).toBeCalled();
      });
    });
  });

  context('when click modify cancel button', () => {
    it('cancel function to be called', () => {
      fireEvent.click(screen.getByText('취소'));

      expect(changeRecommentEditState).toBeCalled();
    });
  });
});
