import {
  fireEvent, render, screen,
} from '@testing-library/react';

import PostEditFormPage from './PostEditFormPage';

const fetchPost = jest.fn();
const fetchBoards = jest.fn();

const changeCategory = jest.fn();
const changeBoard = jest.fn();

const upload = jest.fn();
const patch = jest.fn();
const navigate = jest.fn();

const reset = jest.fn();

let location = {};
let category = '';
let post = {};
let boards = [];

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPost,
  changeCategory,
  upload,
  patch,
  post,
  category,
}));

jest.mock('../hooks/useBoardStore', () => () => ({
  fetchBoards,
  changeBoard,
  reset,
  boards,
}));

const context = describe;

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
  useNavigate() {
    return navigate;
  },
}));

describe('PostEditFormPage', () => {
  beforeEach(() => {
    boards = [
      {
        id: 1,
        boardName: '전체 게시판',
        deleted: false,
      },

      {
        id: 2,
        boardName: 'EPL',
        deleted: false,
      },

      {
        id: 3,
        boardName: 'LaLiga',
        deleted: false,
      },
    ];

    post = {
      postInformation: {
        title: '미스터션샤인',
        content: '슬픈 행진',
      },
    };

    location = {
      pathname: '/posts/edit/1',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    };

    category = 'EPL';

    render(<PostEditFormPage />);
  });

  it('render select option', () => {
    screen.getByText('EPL');
  });

  it('render input title and content', () => {
    screen.getByDisplayValue('미스터션샤인');
    screen.getByDisplayValue('슬픈 행진');
  });

  it('render input file', () => {
    screen.getByPlaceholderText('파일 선택');
  });

  it('render button', () => {
    screen.getByText('수정취소');
    screen.getByText('수정완료');
  });

  context('when click cancel button', () => {
    it('navigate to be called', () => {
      fireEvent.click(screen.getByText('수정취소'));

      expect(navigate).toBeCalled();
    });
  });
});
