import {
  fireEvent, render, screen,
} from '@testing-library/react';

import BoardList from './BoardList';

const changeBoard = jest.fn();

const context = describe;

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('BoardList', () => {
  beforeEach(() => {
    const boardList = [
      {
        id: 1,
        boardName: {
          value: 'K-League',
        },
        parentId: null,
      },

      {
        id: 2,
        boardName: {
          value: 'EPL',
        },
        parentId: null,
      },
    ];

    render(<BoardList
      boardList={boardList}
      changeBoard={changeBoard}
    />);
  });

  it('render board list', () => {
    screen.getByText('K-League');
    screen.getByText('EPL');
  });

  context('when click board', () => {
    it('changeBoard function called', () => {
      fireEvent.click(screen.getByText('EPL'));

      expect(changeBoard).toBeCalled();
    });
  });
});
