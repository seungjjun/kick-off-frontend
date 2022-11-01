import { fireEvent, render, screen } from '@testing-library/react';

import PostPage from './PostPage';

const fetchPost = jest.fn();
const countLike = jest.fn();
let location = jest.fn();
let post = {};
let category = {};
let author = {};
let likes = {};

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPost,
  countLike,
  post,
  category,
  author,
  likes,
}));

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
}));

describe('PostPage', () => {
  beforeEach(() => {
    post = {
      title: '이강인 손흥민과 한 팀??',
      content: '이강인 토트넘 이적 루머',
      hit: 50,
      createdAt: '2022-10-31',
    };

    category = {
      name: 'SerieA',
    };

    author = {
      name: '이강인',
    };

    likes = {
      id: 1,
      length: 1,
    };

    location = {
      pathname: '/post/1',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    };

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
});
