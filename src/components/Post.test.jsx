import { render, screen } from '@testing-library/react';

import Post from './Post';

test('Post', () => {
  const post = {
    title: '이강인 손흥민과 한 팀??',
    content: '이강인 토트넘 이적 루머',
    hit: 50,
    createdAt: '2022-10-31',
  };

  const category = {
    name: 'SerieA',
  };

  const author = {
    name: '이강인',
  };

  const likes = {
    id: 1,
    length: 1,
  };

  render(<Post
    post={post}
    category={category}
    author={author}
    likes={likes}
  />);

  screen.getByText('제목: 이강인 손흥민과 한 팀??');
  screen.getByText('내용: 이강인 토트넘 이적 루머');
  screen.getByText('조회수: 50');
});
