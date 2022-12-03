import {
  render, screen,
} from '@testing-library/react';

import PostFormPage from './PostFormPage';

const navigate = jest.fn();
const changeBoard = jest.fn();
const write = jest.fn();
const upload = jest.fn();
const fetchBoards = jest.fn();

let boards = [];

let postId = '';

let boardId = '';

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/usePostStore', () => () => ({
  write,
  upload,
  postId,
}));

jest.mock('../hooks/useBoardStore', () => () => ({
  fetchBoards,
  changeBoard,
  boardId,
  boards,
}));

describe('PostFormPage', () => {
  beforeEach(() => {
    postId = 1;

    boardId = 1;

    boards = [
      {
        id: 1,
        boardName: {
          value: '전체 게시판',
        },
      },
    ];

    render(<PostFormPage />);
  });

  it('render board select', () => {
    expect(screen.getByRole('option', { name: '게시판을 선택해 주세요' }).selected).toBeTruthy();
  });

  it('render input title', () => {
    expect(screen.getByPlaceholderText('제목을 입력해 주세요'));
  });

  it('render input content', () => {
    expect(screen.getByPlaceholderText('내용을 입력하세요'));
  });

  it('render upload file button', () => {
    expect(screen.getByPlaceholderText('파일 선택'));
  });

  it('render post buttons', () => {
    expect(screen.getByText('취소'));
    expect(screen.getByText('등록'));
  });
});
