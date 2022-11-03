import { fireEvent, render, screen } from '@testing-library/react';

import Posts from './Posts';

const navigate = jest.fn();

describe('posts', () => {
  beforeEach(() => {
    const posts = [
      {
        id: 1,
        title: '대한민국 카타르 월드컵 4강 진출',
        categoryId: 1,
        hit: 52,
        imageUrl: 'imageUrl',
        userId: 3,
        createdAt: '2022-11-01',
      },
    ];
    const commentNumber = [1, 1, 1, 1, 2];
    const likes = [
      {
        id: 5,
        postId: 1,
        userId: 3,
      },
    ];
    const categories = [
      {
        id: 1,
        name: 'EPL',
      },
    ];
    const users = [
      {
        id: 3,
        identification: 'jel1y',
        name: '굉민재',
        profileImage: 'profileImage',
      },
    ];

    const recommentNumber = [1, 1, 1];

    render(<Posts
      posts={posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={likes}
      users={users}
      categories={categories}
      navigate={navigate}
    />);
  });

  it(('render title'), () => {
    screen.getByText('대한민국 카타르 월드컵 4강 진출 [7]');
  });

  it(('render category and title'), () => {
    screen.getByText('EPL / 굉민재');
  });

  it(('render like number'), () => {
    screen.getByText('1 2022-11-01 52');
  });

  it(('render post detail page'), () => {
    fireEvent.click(screen.getByText('대한민국 카타르 월드컵 4강 진출 [7]'));

    expect(navigate).toBeCalledWith('/post/1');
  });
});
