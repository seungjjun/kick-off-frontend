import { fireEvent, render, screen } from '@testing-library/react';

import CategoryPosts from './CategoryPosts';

const navigate = jest.fn();
const changePageNumber = jest.fn();
const nextPage = jest.fn();
const previousPage = jest.fn();

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

    const pageButtons = [1, 2, 3];

    const isPreviousPage = false;

    const isNextPage = true;

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
      changePageNumber={changePageNumber}
      nextPage={nextPage}
      previousPage={previousPage}
      pageButtons={pageButtons}
      isPreviousPage={isPreviousPage}
      isNextPage={isNextPage}
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

  it('render page buttons', () => {
    screen.getByText('1');
    screen.getByText('2');
    screen.getByText('3');
  });

  it('render next page button', () => {
    screen.getByText('다음');
  });

  context('when click page button', () => {
    it('next page function call', () => {
      fireEvent.click(screen.getByText('다음'));

      expect(nextPage).toBeCalled();
    });

    it('changePageNumber function call', () => {
      fireEvent.click(screen.getByText('3'));

      expect(changePageNumber).toBeCalled();
    });
  });
});
