import { fireEvent, render, screen } from '@testing-library/react';

import PostForm from './PostForm';

const context = describe;

describe('PostForm', () => {
  context('when write post form', () => {
    it('submit form', () => {
      const postStore = jest.fn();
      const navigate = jest.fn();
      const submit = jest.fn();
      const changeCategory = jest.fn();

      render(<PostForm
        postStore={postStore}
        navigate={navigate}
        submit={submit}
        changeCategory={changeCategory}
      />);

      fireEvent.click(screen.getByText('게시판을 선택해 주세요'));
      fireEvent.click(screen.getByText('EPL'));

      // expect(changeCategory).toBeCalled();

      fireEvent.change(screen.getByPlaceholderText('제목을 입력해 주세요'), {
        target: { value: '손흥민 득점왕' },
      });

      fireEvent.change(screen.getByPlaceholderText('내용을 입력하세요'), {
        target: { value: '손흥민 아시아 최초 득점왕' },
      });

      fireEvent.submit(screen.getByText('등록'));

      // expect(navigate).toBeCalled();
    });
  });

  context('when click cancle button', () => {
    it('navigate to be called', () => {
      const postStore = jest.fn();
      const navigate = jest.fn();
      const submit = jest.fn();

      render(<PostForm
        postStore={postStore}
        navigate={navigate}
        submit={submit}
      />);

      fireEvent.click(screen.getByText('취소'));

      expect(navigate).toBeCalledWith('/');
    });
  });
});
