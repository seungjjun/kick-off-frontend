import { fireEvent, render, screen } from '@testing-library/react';

import Posts from './Posts';

test('posts', () => {
  const posts = [
    {
      id: 1,
      title: '손흥민 득점왕 수상',
      category: 'EPL',
      author: '굉민재',
      commentNumber: 3,
      like: 20,
    },
  ];

  const navigate = jest.fn();

  render(<Posts
    posts={posts}
    navigate={navigate}
  />);

  screen.getByText('손흥민 득점왕 수상 [3]');

  fireEvent.click(screen.getByText('손흥민 득점왕 수상 [3]'));

  expect(navigate).toBeCalledWith('/post/1');
});
