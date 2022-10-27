import { render, screen } from '@testing-library/react';

import Posts from './Posts';

test('posts', () => {
  const posts = [
    {
      title: '손흥민 득점왕 수상',
      category: 'EPL',
      author: '굉민재',
      commentNumber: 3,
      like: 20,
    },
  ];

  render(<Posts posts={posts} />);

  screen.getByText('손흥민 득점왕 수상 [3]');
});
