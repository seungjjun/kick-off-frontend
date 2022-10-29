import { render, screen } from '@testing-library/react';

import PostPage from './PostPage';

const fetchPost = jest.fn();
let location = jest.fn();
let post = {};

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPost,
  post,
}));

jest.mock('react-router-dom', () => ({
  useLocation() {
    return location;
  },
}));

test('PostPage', () => {
  post = {
    title: '이강인 손흥민과 한 팀??',
    content: '이강인 토트넘 이적 루머',
    hit: 50,
  };

  location = {
    pathname: '/post/1',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };

  render(<PostPage />);

  screen.getByText('제목: 이강인 손흥민과 한 팀??');
  screen.getByText('내용: 이강인 토트넘 이적 루머');
  screen.getByText('조회수: 50');
});
