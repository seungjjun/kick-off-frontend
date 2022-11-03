import { fireEvent, render, screen } from '@testing-library/react';

import PostPage from './PostPage';

const fetchPost = jest.fn();
const fetchPosts = jest.fn();
const countLike = jest.fn();
const fetchComment = jest.fn();
const setRecommentVisibleState = jest.fn();

let location = jest.fn();
let post = {};
let category = {};
let user = {};
let likes = {};
let users = [];

let comments = {};
let recomments = {};

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPost,
  fetchPosts,
  countLike,
  post,
  category,
  user,
  likes,
  users,
}));

jest.mock('../hooks/useCommentStore', () => () => ({
  fetchComment,
  comments,
  recomments,
  setRecommentVisibleState,
}));

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
}));

describe('PostPage', () => {
  beforeEach(() => {
    post = {
      id: 1,
      title: '이강인 손흥민과 한 팀??',
      content: '이강인 토트넘 이적 루머',
      hit: 50,
      createdAt: '2022-10-31',
    };

    category = {
      name: 'SerieA',
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
    }];

    recomments = [{
      id: 2,
      conent: '1번째 게시글의 1번째 댓글의 댓글',
      commentId: 1,
      postId: 1,
      userId: 1,
    }];

    render(<PostPage />);
  });

  it('render title', () => {
    screen.getByText('제목: 이강인 손흥민과 한 팀??');
  });

  it('render content', () => {
    screen.getByText('내용: 이강인 토트넘 이적 루머');
  });

  it('render hit', () => {
    screen.getByText('조회수: 50');
  });

  it('render category, author', () => {
    screen.getByText('SerieA / 이강인');
  });

  it('render createDate', () => {
    screen.getByText('등록날짜: 2022-10-31');
  });

  it('render like button', () => {
    screen.getByText('좋아요');
  });

  it('click like button', () => {
    fireEvent.click(screen.getByText('좋아요'));

    expect(countLike).toBeCalled();
  });

  it('render comment', () => {
    screen.getByText('이강인 1번째 게시글의 댓글');
  });

  it('render recomment button', () => {
    screen.getByText('답글쓰기');
  });
});
