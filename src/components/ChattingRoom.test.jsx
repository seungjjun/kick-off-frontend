import { fireEvent, render, screen } from '@testing-library/react';

import ChattingRoom from './ChattingRoom';

const messageChange = jest.fn();

const publishMessage = jest.fn();

describe('chattingRoom', () => {
  beforeEach(() => {
    const message = 'input';

    const chatMessages = [
      {
        message: '대전 파이팅',
        name: '훈이',
      },
    ];

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

    const nickname = '훈이';

    render(<ChattingRoom
      message={message}
      messageChange={messageChange}
      chatMessages={chatMessages}
      publishMessage={publishMessage}
      predictions={predictions}
      nickname={nickname}
    />);
  });

  it('render send button', () => {
    screen.getByText('전송');
  });

  it('click send button', () => {
    fireEvent.change(screen.getByDisplayValue('input'), {
      target: { value: '안녕하세요' },
    });

    fireEvent.click(screen.getByText('전송'));

    expect(publishMessage).toBeCalled();
  });

  it('render my message', () => {
    screen.getByText('대전 파이팅');
  });
});
