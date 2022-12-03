import { render, screen } from '@testing-library/react';

import SchedulePage from './SchedulePage';

const navigate = jest.fn();

const fetchTodaySchedule = jest.fn();
const fetchPeriodSchedule = jest.fn();
const changeRoomId = jest.fn();
const setPeriodGames = jest.fn();

let todayGames = [];
let periodGames = [];
let location = {};

const ko = {};
jest.mock('react-datepicker/dist/react-datepicker.css', () => null);

jest.mock('date-fns/esm/locale', () => () => ({
  ko,
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },

  useLocation() {
    return location;
  },
}));

jest.mock('../hooks/useScheduleStore', () => () => ({
  fetchTodaySchedule,
  fetchPeriodSchedule,
  setPeriodGames,
  changeRoomId,
  todayGames,
  periodGames,
}));

const context = describe;

describe('SchedulePage', () => {
  beforeEach(() => {
    todayGames = [
      {
        fixture: {
          id: 868071,
          date: '2022-11-13T23:00:00+09:00',
        },

        teams: {
          home: {
            id: 39,
            name: 'Fulham',
            logo: 'logo.png',
          },

          away: {
            id: 42,
            name: 'Manchester United',
            logo: 'logo,png',
          },
        },
      },
    ];

    periodGames = [
      {
        fixture: {
          id: 868097,
          date: '2022-11-13T16:30:00+09:00',
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
    ];

    location = {
      pathname: '/schedule/EPL',
    };

    render(<SchedulePage />);
  });

  context('when check today fixture', () => {
    it('render today match home team name', () => {
      screen.getByText('Fulham');
    });

    it('render today match away team name', () => {
      screen.getByText('Manchester United');
    });

    it('render today match time', () => {
      screen.getByText('23:00');
    });
  });

  context('when search fixture', () => {
    it('render match information', () => {
      screen.getByText('Stamford Bridge');
      screen.getByText('TotenHam 2:1 Arsenal');
      screen.getByText('16:30');
    });
  });
});
