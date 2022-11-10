import { fireEvent, render, screen } from '@testing-library/react';

import Posts from './Posts';

const navigate = jest.fn();
const changePageNumber = jest.fn();
const nextPage = jest.fn();
const previousPage = jest.fn();

describe('posts', () => {
  beforeEach(() => {
    const posts = [
      {
        id: 1,
        postInformation: {
          title: '대한민국 카타르 월드컵 4강 진출',
        },
        categoryId: 1,
        hit: 52,
        imageUrl: 'imageUrl',
        userId: {
          userId: 3,
        },
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

    const pageButtons = [1, 2, 3, 4, 5];

    const isPreviousPage = false;

    const isNextPage = true;

    render(<Posts
      posts={posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={likes}
      users={users}
      categories={categories}
      navigate={navigate}
      changePageNumber={changePageNumber}
      nextPage={nextPage}
      previousPage={previousPage}
      pageButtons={pageButtons}
      isPreviousPage={isPreviousPage}
      isNextPage={isNextPage}
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

  it('render page buttons', () => {
    screen.getByText('1');
    screen.getByText('2');
    screen.getByText('3');
    screen.getByText('4');
    screen.getByText('5');
  });

  it('click next page button', () => {
    fireEvent.click(screen.getByText('다음'));

    expect(nextPage).toBeCalled();
  });

  it('click page button', () => {
    fireEvent.click(screen.getByText('1'));

    expect(changePageNumber).toBeCalled();
  });

  it('render next page button', () => {
    screen.getByText('다음');
  });
});
