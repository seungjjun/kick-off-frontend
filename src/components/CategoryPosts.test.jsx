import { fireEvent, render, screen } from '@testing-library/react';

import CategoryPosts from './CategoryPosts';

const navigate = jest.fn();

const context = describe;

describe('CategoryPosts', () => {
  beforeEach(() => {
    const posts = [
      {
        id: 1,
        postInformation: {
          title: '이강인 맨시티 이적...!!',
        },
        categoryId: 1,
        hit: 12,
        imageUrl: 'imageUrl',
        userId: {
          userId: 1,
        },
        createdAt: '2022-11-10',
      },
    ];

    const commentNumber = [1, 1, 1, 1, 2];

    const likes = [
      {
        id: 1,
        postId: 1,
        userId: 1,
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
        id: 1,
        identification: 'jel1y',
        name: '골든보이',
        profileImage: 'profileImage',
      },
    ];

    const recommentNumber = [1, 1, 1];

    const categoryId = 1;

    render(<CategoryPosts
      posts={posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={likes}
      users={users}
      categories={categories}
      navigate={navigate}
      categoryId={categoryId}
    />);
  });

  it('render category name', () => {
    screen.getByText('EPL');
  });

  it('render post title', () => {
    screen.getByText('이강인 맨시티 이적...!! [7]');
  });

  it('render user category and name', () => {
    screen.getByText('EPL / 골든보이');
  });

  context('when click post', () => {
    it('navigate call', () => {
      fireEvent.click(screen.getByText('이강인 맨시티 이적...!! [7]'));

      expect(navigate).toBeCalled();
    });
  });
});
