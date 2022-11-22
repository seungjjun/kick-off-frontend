import { render, screen } from '@testing-library/react';

import Comparison from './Comparison';

const context = describe;

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
    render(<Comparison
      predictions={predictions}
    />);
  });

  context('when compare match', () => {
    it('render team name', () => {
      screen.getByText('대전 시티즌');
    });

    it('render both teams record', () => {
      screen.getByText('5승1무3패 4승2무3패');
    });

    it('render recent match result', () => {
      screen.getByText('DLWWL 최근경기 WDWWD');

      screen.getByText('최근 양팀 맞대결');

      screen.getByText('대전 시티즌');
      screen.getByText('1 2022-05-17 2');
      screen.getByText('FC서울');
    });

    it('render average goals', () => {
      screen.getByText('1.5평균득점1.6');
    });

    it('render average goals against', () => {
      screen.getByText('1.4평균실점1.8');
    });

    it('render goals minute', () => {
      screen.getByText('득점 시간대');

      screen.getByText('15.12%');
      screen.getByText('0 ~ 15');
      screen.getByText('16.67%');
    });
  });
});
