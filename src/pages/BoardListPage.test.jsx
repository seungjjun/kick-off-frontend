import {
  cleanup, fireEvent, render, screen,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import BoardListPage from './BoardListPage';

const fetchBoards = jest.fn();
const setKeyword = jest.fn();

let boards = [];

jest.mock('../hooks/useBoardStore', () => () => ({
  fetchBoards,
  boards,
  setKeyword,
}));

describe('BoardListPage', () => {
  beforeEach(() => {
    boards = [
      {
        id: 1,
        boardName: {
          value: '전체게시판',
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
      {
        id: 3,
        boardName: {
          value: 'LaLiga',
        },
        parentId: null,
      },
      {
        id: 4,
        boardName: {
          value: 'SerieA',
        },
        parentId: null,
      },
      {
        id: 5,
        boardName: {
          value: 'Bundesliga',
        },
        parentId: null,
      },
    ];

    render(
      <MemoryRouter>
        <BoardListPage />
      </MemoryRouter>,
    );
  });

  it('render board list', () => {
    screen.getByText('전체게시판');
    screen.getByText('EPL');
    screen.getByText('LaLiga');
    screen.getByText('SerieA');
    screen.getByText('Bundesliga');

    expect(fetchBoards).toBeCalled();

    cleanup();
  });

  it('render board list', () => {
    fireEvent.click(screen.getByText('전체게시판'));

    expect(setKeyword).toBeCalled();

    cleanup();
  });
});
