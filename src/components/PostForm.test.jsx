import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import PostForm from './PostForm';

const navigate = jest.fn();
const submit = jest.fn();
const changeBoard = jest.fn();
const upload = jest.fn();

let image = '';

const context = describe;

describe('PostForm', () => {
  beforeEach(() => {
    const boardList = [
      {
        id: 1,
        boardName: {
          value: '전체 게시판',
        },
        deleted: false,
      },

      {
        id: 2,
        boardName: {
          value: 'EPL',
        },
        deleted: false,
      },

      {
        id: 3,
        boardName: {
          value: 'LaLiga',
        },
        deleted: false,
      },
    ];

    image = 'image';

    render(<PostForm
      boardList={boardList}
      navigate={navigate}
      submit={submit}
      changeBoard={changeBoard}
      upload={upload}
      image={image}
    />);
  });

  it('render board list', () => {
    screen.getByText('전체 게시판');
    screen.getByText('EPL');
    screen.getByText('LaLiga');
  });

  context('when write post form', () => {
    it('submit function called', async () => {
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

      await waitFor(() => {
        expect(submit).toBeCalled();
      });
    });
  });

  context('when click cancle button', () => {
    it('navigate to be called', () => {
      fireEvent.click(screen.getByText('취소'));

      expect(navigate).toBeCalledWith('/');
    });
  });
});
