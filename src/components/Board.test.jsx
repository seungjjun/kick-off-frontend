import { fireEvent, render, screen } from '@testing-library/react';

import Board from './Board';

const navigate = jest.fn();
const changePageNumber = jest.fn();
const nextPage = jest.fn();
const previousPage = jest.fn();
const moveToUserPage = jest.fn();

const context = describe;

describe('Board', () => {
  beforeEach(() => {
    const accessToken = 'ACCESS.TOKEN';

    const posts = {
      posts: [
        {
          id: 1,
          postInformation: {
            title: '이강인 맨시티 이적...!!',
          },
          boardId: 1,
          hit: 12,
          imageUrl: 'imageUrl',
          userId: 1,
          createdAt: '2022-11-10',
        },
      ],

      boards: [
        {
          id: 1,
          boardName: 'EPL',
          parentId: null,
        },
      ],

      users: [
        {
          id: 1,
          identification: 'jel1y',
          name: 'son7',

        },
      ],

      likes: [
        {
          id: 1,
          postId: 1,
          userId: 1,
        },
      ],
    };

    const commentNumber = [1, 1, 1, 1, 2];

    const recommentNumber = [1, 1, 1];

    const pagination = {
      changePageNumber,
      nextPage,
      previousPage,
      isPreviousPage: true,
      isNextPage: true,
      pageButtons: [1, 2, 3],
    };

    render(<Board
      accessToken={accessToken}
      posts={posts}
      navigate={navigate}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      pagination={pagination}
      moveToUserPage={moveToUserPage}
    />);
  });

  context('when render post list', () => {
    it('render posts information', () => {
      screen.getByText('이강인 맨시티 이적...!! [7]');
      screen.getByText('EPL');
      screen.getByText('son7');
    });

    it('render page button', () => {
      screen.getByText('이전');
      screen.getByText('1');
      screen.getByText('2');
      screen.getByText('3');
      screen.getByText('다음');
    });
  });

  context('when click post', () => {
    it('navigate call', () => {
      fireEvent.click(screen.getByText('이강인 맨시티 이적...!! [7]'));

      expect(navigate).toBeCalled();
    });

    it('navigate call', () => {
      fireEvent.click(screen.getByAltText('uploadImage'));

      expect(navigate).toBeCalled();
    });
  });

  context('when click board name', () => {
    it('navigate call', () => {
      fireEvent.click(screen.getByText('EPL'));

      expect(navigate).toBeCalledWith('/board?id=1');
    });
  });

  context('when click nickname', () => {
    it('navigate call', () => {
      fireEvent.click(screen.getByText('son7'));

      expect(moveToUserPage).toBeCalled();
      expect(navigate).toBeCalled();
    });
  });

  context('when click page button', () => {
    it('previous page function call', () => {
      fireEvent.click(screen.getByText('이전'));

      expect(previousPage).toBeCalled();
    });

    it('changePageNumber function call', () => {
      fireEvent.click(screen.getByText('3'));

      expect(changePageNumber).toBeCalled();
    });

    it('next page function call', () => {
      fireEvent.click(screen.getByText('다음'));

      expect(nextPage).toBeCalled();
    });
  });
});
