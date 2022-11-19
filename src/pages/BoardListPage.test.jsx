import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BoardListPage from './BoardListPage';

const fetchBoards = jest.fn();

let boards = [];

jest.mock('../hooks/useBoardStore', () => () => ({
  fetchBoards,
  boards,
}));

describe('BoardListPage', () => {
  beforeEach(() => {
    boards = [
      {
        id: 1,
        boardName: {
          value: '전체게시판',
        },
      },
      {
        id: 2,
        boardName: {
          value: 'EPL',
        },
      },
      {
        id: 3,
        boardName: {
          value: 'LaLiga',
        },
      },
      {
        id: 4,
        boardName: {
          value: 'SerieA',
        },
      },
      {
        id: 5,
        boardName: {
          value: 'Bundesliga',
        },
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
  });
});
