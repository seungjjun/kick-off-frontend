import { render, screen } from '@testing-library/react';

import GameTable from './GameTable';

describe('GameTable', () => {
  beforeEach(() => {
    const games = [
      {
        fixture: {
          id: 868106,
          date: '2022-12-26T20:00:00+00:00',
          venue: {
            name: 'Emirates Stadium',
          },
          status: {
            short: 'NS',
          },
        },

        teams: {
          home: {
            name: 'Arsenal',
            logo: 'logo.png',
          },
          away: {
            name: 'West Ham',
            logo: 'logo.png',
          },
        },
      },
    ];

    render(<GameTable
      games={games}
    />);
  });

  it('render searched match imformation', () => {
    screen.getByText('12-26');
    screen.getByText('Arsenal VS West Ham');
    screen.getByText('Emirates Stadium');
  });
});
