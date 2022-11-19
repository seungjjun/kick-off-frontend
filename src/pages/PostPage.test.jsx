import { fireEvent, render, screen } from '@testing-library/react';

import PostPage from './PostPage';

const fetchPost = jest.fn();
const deletePost = jest.fn();
const fetchUsers = jest.fn();
const fetchLike = jest.fn();

const countLike = jest.fn();
const fetchComment = jest.fn();
const fetchRecomment = jest.fn();
const setRecommentVisibleState = jest.fn();
const navigate = jest.fn();

let location = {};
let post = {};
let board = {};
let user = {};
let likes = {};
let users = [];

let comments = {};
let recomments = {};

let page = {};
let pageButton = [];

let accessToken = '';

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPost,
  deletePost,
  post,
  user,
  board,
}));

jest.mock('../hooks/useCommentStore', () => () => ({
  fetchComment,
  fetchRecomment,
  comments,
  recomments,
  setRecommentVisibleState,
  page,
  pageButton,
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchUsers,
  users,
  user,
}));

jest.mock('../hooks/useLikeStore', () => () => ({
  fetchLike,
  countLike,
  likes,
}));

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
  useNavigate() {
    return navigate;
  },
}));

jest.mock('usehooks-ts', () => ({
  useLocalStorage() {
    return accessToken;
  },
}));

describe('PostPage', () => {
  beforeEach(() => {
    post = {
      postInformation: {
        title: '이강인 손흥민과 한 팀??',
        content: '이강인 토트넘 이적 루머',
      },
      id: 1,
      hit: 50,
      createdAt: '2022-10-31',
    };

    board = {
      boardName: {
        value: 'SerieA',
      },
    };

    user = {
      name: '이강인',
    };

    users = [
      {
        id: 1,
        name: '이강인',
      },
    ];

    likes = [
      {
        id: 1,
        length: 1,
      },
    ];

    location = {
      pathname: '/post/1',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    };

    comments = [{
      id: 1,
      content: '1번째 게시글의 댓글',
      userId: 1,
      postId: 1,
      deleted: false,
    }];

    recomments = [{
      id: 2,
      conent: '1번째 게시글의 1번째 댓글의 댓글',
      commentId: 1,
      postId: 1,
      userId: 1,
    }];

    page = {
      startPage: 1,
      lastPage: 10,
      currentLastPage: 11,
    };

    pageButton = [1, 2, 3];

    accessToken = 'ACCESS.TOKEN';

    render(<PostPage />);
  });

  it('render title', () => {
    screen.getByText('이강인 손흥민과 한 팀??');
  });

  it('render content', () => {
    screen.getByText('이강인 토트넘 이적 루머');
  });

  it('render category', () => {
    screen.getByText('SerieA >');
  });

  it('render createDate', () => {
    screen.getByText('2022-10-31 조회 50');
  });

  it('render like button', () => {
    screen.getByText('좋아요');
  });

  it('click like button', () => {
    fireEvent.click(screen.getByText('좋아요'));

    expect(countLike).toBeCalled();
  });

  it('render comment', () => {
    screen.getByText('1번째 게시글의 댓글');
  });

  it('render recomment button', () => {
    screen.getByText('답글쓰기');
  });

  it('render delete button', () => {
    screen.getAllByText('삭제');
  });
});
