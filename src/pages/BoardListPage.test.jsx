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
        boardName: '전체게시판',
        parentId: 0,
      },
      {
        id: 2,
        boardName: 'EPL',
        parentId: 0,
      },
      {
        id: 3,
        boardName: 'LaLiga',
        parentId: 0,
      },
      {
        id: 4,
        boardName: 'SerieA',
        parentId: 0,
      },
      {
        id: 5,
        boardName: 'Bundesliga',
        parentId: 0,
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
