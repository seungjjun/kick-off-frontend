import { render, screen } from '@testing-library/react';

import Schedule from './Schedule';

const compare = jest.fn();

describe('Schedule', () => {
  beforeEach(() => {
    const gameTime = '23:00';

    const todayHomaTeam = {
      name: 'TotenHam',
    };

    const todayAwayTeam = {
      name: 'Arsenal',
    };

    const gameId = 1;

    render(<Schedule
      compare={compare}
      gameTime={gameTime}
      todayHomaTeam={todayHomaTeam}
      todayAwayTeam={todayAwayTeam}
      gameId={gameId}
    />);
  });

  it('render home team name', () => {
    screen.getByText('TotenHam');
  });

  it('render away team name', () => {
    screen.getByText('Arsenal');
  });

  it('render comparison button', () => {
    screen.getByText('전력비교');
  });

  it('render game time', () => {
    screen.getByText('23:00');
  });
});
