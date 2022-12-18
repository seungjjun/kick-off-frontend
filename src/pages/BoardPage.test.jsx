import { cleanup, render, screen } from '@testing-library/react';

import BoardPage from './BoardPage';

const fetchPosts = jest.fn();

const navigate = jest.fn();

const makePage = jest.fn();
const changePageNumber = jest.fn();
const nextPage = jest.fn();
const previousPage = jest.fn();

const searchPosts = jest.fn();
const changeKeywordType = jest.fn();
const changeKeyword = jest.fn();

const fetchHotPosts = jest.fn();

const comments = [];
const recomments = [];

const pageNumber = 0;
const keyword = '';
const boardName = '';

let posts = [];
let location = {};
let page = {};
let pageButton = [];
let hotPosts = [];

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },

  useLocation() {
    return location;
  },
}));

jest.mock('../hooks/useBoardStore', () => () => ({
  fetchPosts,
  pageNumber,
  posts,
  changePageNumber,
  makePage,
  nextPage,
  previousPage,
  page,
  pageButton,
  comments,
  recomments,
  searchPosts,
  keyword,
  changeKeywordType,
  changeKeyword,
  boardName,
  fetchHotPosts,
  hotPosts,
}));

describe('BoardPage', () => {
  beforeEach(() => {
    posts = {
      posts: [
        {
          id: 1,
          postInformation: {
            title: '2022년 카타르 월드컵 개막',
          },
          boardId: 1,
          hit: 100,
          imageUrl: 'imageUrl',
          userId: 1,
          createdAt: '2022-11-22',
        },
      ],

      boards: [
        {
          id: 1,
          boardName: '전체게시판',
        },
      ],

      users: [
        {
          id: 1,
          identification: 'jel1y',
          name: 'son7',

        },
      ],

      likes: [
        {
          id: 1,
          postId: 1,
          userId: 1,
        },
      ],
    };

    location = {
      pathname: '/board',
      search: '?id=1',
    };

    page = {
      startPage: 1,
      lastPage: 10,
      currentLastPage: 11,
    };

    pageButton = [1, 2, 3, 4, 5];

    hotPosts = [

    ];

    render(<BoardPage />);
  });

  it('render board name', () => {
    screen.getByText('전체게시판');

    cleanup();
  });

  it('render post title', () => {
    screen.getByText('2022년 카타르 월드컵 개막 [0]');

    cleanup();
  });

  it('render page buttons', () => {
    screen.getByText('1');
    screen.getByText('2');
    screen.getByText('3');
    screen.getByText('4');
    screen.getByText('5');

    cleanup();
  });

  it('render next page button', () => {
    screen.getByText('다음');

    cleanup();
  });
});
