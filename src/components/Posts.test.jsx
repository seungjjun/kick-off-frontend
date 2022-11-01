import { fireEvent, render, screen } from '@testing-library/react';

import Posts from './Posts';

test('posts', () => {
  const posts = [
    {
      category: {
        id: 1,
        name: 'EPL',
      },
      comments: {
        id: 1,
        length: 3,
      },
      user: {
        id: 1,
        name: '굉민재',
      },
      likes: {
        id: 1,
        length: 3,
      },
      id: 1,
      title: '손흥민 득점왕 수상',
      createdAt: '2022-10-30',
      hit: 10,
      imageUrl: 'imageUrl',
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
