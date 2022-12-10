import { render, screen } from '@testing-library/react';

import Comparison from './Comparison';

const context = describe;

let todayGames = {};
jest.mock('../hooks/useScheduleStore', () => () => ({
  todayGames,
}));

describe('Comparison', () => {
  beforeEach(() => {
    const predictions = [
      {
        teams: {
          home: {
            name: '대전 시티즌',
            logo: 'DaejeonLogo',
            league: {
              form: 'WWDLWWL',

              goals: {
                for: {
                  average: {
                    total: 1.5,
                  },
                  minute: {
                    '0-15': {
                      percentage: '15.12%',
                    },

                    '16-30': {
                      percentage: '30.77%',
                    },

                    '31-45': {
                      percentage: 'null',
                    },

                    '46-60': {
                      percentage: '23.08%',
                    },

                    '61-75': {
                      percentage: '15.12%',
                    },

                    '76-90': {
                      percentage: '17.92%',
                    },

                    '91-105': {
                      percentage: 'null',
                    },

                    '106-120': {
                      percentage: 'null',
                    },
                  },
                },

                against: {
                  average: {
                    total: 1.4,
                  },
                },
              },

              fixtures: {
                wins: {
                  total: 5,
                },
                draws: {
                  total: 1,
                },
                loses: {
                  total: 3,
                },
              },
            },
          },

          away: {
            name: 'FC서울',
            logo: 'SeoulLogo',
            league: {
              form: 'LLDWWDW',

              goals: {
                for: {
                  average: {
                    total: 1.6,
                  },
                  minute: {
                    '0-15': {
                      percentage: '16.67%',
                    },

                    '16-30': {
                      percentage: '11.11%',
                    },

                    '31-45': {
                      percentage: '16.67%',
                    },

                    '46-60': {
                      percentage: '22.22%',
                    },

                    '61-75': {
                      percentage: '16.67%',
                    },

                    '76-90': {
                      percentage: '16.67%',
                    },

                    '91-105': {
                      percentage: 'null',
                    },

                    '106-120': {
                      percentage: 'null',
                    },
                  },
                },

                against: {
                  average: {
                    total: 1.8,
                  },
                },
              },

              fixtures: {
                wins: {
                  total: 4,
                },
                draws: {
                  total: 2,
                },
                loses: {
                  total: 3,
                },
              },
            },
          },
        },

        h2h: [
          {
            goals: {
              home: 1,
              away: 2,
            },

            fixture: {
              id: 1,
              date: '2022-05-17T18:45:00+00:00',
            },
          },
        ],
      },
    ];

    todayGames = [
      {
        fixture: {
          status: {
            long: 'Match Finished',
          },

          date: '2022-11-08T05:00:00+09:00',

          venue: {
            name: 'Estadio de Vallecas',
          },
        },
      },
    ];
    render(<Comparison
      predictions={predictions}
    />);
  });

  context('when compare match', () => {
    it('render team name', () => {
      screen.getAllByText('대전 시티즌');
    });

    it('render both teams record', () => {
      screen.getByText('5승 1무 3패');
      screen.getByText('4승 2무 3패');
    });

    it('render recent match result', () => {
      screen.getByText('최근경기');

      screen.getByText('최근 양팀 맞대결');

      screen.getAllByText('대전 시티즌');
      screen.getByText('2022-05-17');
      screen.getAllByText('FC서울');
    });

    it('render average goals', () => {
      screen.getByText('1.5');
      screen.getByText('평균득점');
      screen.getByText('1.6');
    });

    it('render average goals against', () => {
      screen.getByText('1.4');
      screen.getByText('평균실점');
      screen.getByText('1.8');
    });

    it('render goals minute', () => {
      screen.getByText('득점 시간대');

      screen.getAllByText('15.12%');
      screen.getAllByText('0 ~ 15');
      screen.getAllByText('16.67%');
    });
  });
});
