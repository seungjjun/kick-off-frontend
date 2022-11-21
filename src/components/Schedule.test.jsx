import { fireEvent, render, screen } from '@testing-library/react';

import Schedule from './Schedule';

const compare = jest.fn();

const checkScheduleByPeriod = jest.fn();

const ko = {};
jest.mock('react-datepicker/dist/react-datepicker.css', () => null);

jest.mock('date-fns/esm/locale', () => () => ({
  ko,
}));

const context = describe;

describe('Schedule', () => {
  beforeEach(() => {
    const games = {
      todayGames: [
        {
          fixture: {
            id: 868097,
            date: '2022-11-14T01:30:00+09:00',
          },

          teams: {
            home: {
              id: 51,
              name: 'TotenHam',
              logo: 'logo.png',
            },

            away: {
              id: 66,
              name: 'Arsenal',
              logo: 'logo,png',
            },
          },
        },
      ],

      periodGames: [
        {
          fixture: {
            id: 868097,
            date: '2022-11-13T16:30:00+00:00',
            venue: {
              name: 'Stamford Bridge',
            },
            status: {
              short: 'FT',
            },
          },

          teams: {
            home: {
              name: 'TotenHam',
              logo: 'logo.png',
            },
            away: {
              name: 'Arsenal',
              logo: 'logo.png',
            },
          },

          goals: {
            home: 2,
            away: 1,
          },
        },
      ],
    };

    const setPeriod = {

    };

    render(<Schedule
      compare={compare}
      games={games}
      checkScheduleByPeriod={checkScheduleByPeriod}
      setPeriod={setPeriod}
    />);
  });

  context('when check today match', () => {
    it('render today match information', () => {
      screen.getByText('TotenHam');
      screen.getByText('Arsenal');
      screen.getByText('01:30');
    });

    it('render comparison button', () => {
      screen.getByText('전력비교');
    });
  });

  context('when click comparison button', () => {
    it('compare function called', () => {
      fireEvent.click(screen.getByText('전력비교'));

      expect(compare).toBeCalled();
    });
  });

  it('render calendar', () => {
    screen.getByText('경기 조회');
  });

  it('render game inquiry button', () => {
    screen.getByText('조회');
  });

  context('when click calendar inquiry button', () => {
    it('inquiry function called', () => {
      fireEvent.click(screen.getByText('조회'));

      expect(checkScheduleByPeriod).toBeCalled();
    });
  });
});
