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
      const upload = jest.fn();
      let image = '';

      render(<PostForm
        postStore={postStore}
        navigate={navigate}
        submit={submit}
        changeCategory={changeCategory}
        upload={upload}
        image={image}
      />);

      image = 'image';

      expect(screen.getByRole(
        'option',
        { name: '게시판을 선택해 주세요' },
      ).selected).toBeTruthy();

      fireEvent.change(screen.getByPlaceholderText('제목을 입력해 주세요'), {
        target: { value: '손흥민 득점왕' },
      });

      fireEvent.change(screen.getByPlaceholderText('내용을 입력하세요'), {
        target: { value: '손흥민 아시아 최초 득점왕' },
      });

      fireEvent.submit(screen.getByText('등록'));

      // expect(submit).toBeCalled();
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
