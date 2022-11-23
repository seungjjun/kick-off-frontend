import { render, screen } from '@testing-library/react';

import WrittenComments from './WrittenComments';

describe('WrittenComments', () => {
  beforeEach(() => {
    const myInformation = {
      comments: [
        {
          id: 1,
          content: '1번째 댓글',
          commentDate: '2022-11-23',
        },
        {
          id: 2,
          content: '2번째 댓글',
          commentDate: '2022-11-24',
        },
      ],

      recomments: [
        {
          id: 1,
          content: '대댓글',
          commentDate: '2022-11-25',
        },
      ],
    };

    render(<WrittenComments
      myInformation={myInformation}
    />);
  });

  it('render table header', () => {
    screen.getByText('선택');
    screen.getByText('댓글');
    screen.getByText('작성일');
  });

  it('render comments', () => {
    screen.getByText('1번째 댓글');
    screen.getByText('2022-11-23');
    screen.getByText('2번째 댓글');
    screen.getByText('2022-11-24');
    screen.getByText('대댓글');
    screen.getByText('2022-11-25');
  });
});
