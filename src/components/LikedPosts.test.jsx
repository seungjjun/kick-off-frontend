import { render, screen } from '@testing-library/react';

import LikedPosts from './LikedPosts';

describe('LikedPosts', () => {
  beforeEach(() => {
    const myInformation = {
      likedPosts: [
        {
          id: 1,
          postInformation: {
            title: '정신 차려 이 각박한 세상에서',
          },
          createdAt: '2022-11-22',
          hit: 1122,
        },
      ],

      user: {
        name: 'son7',
      },
    };
    render(<LikedPosts
      myInformation={myInformation}
    />);
  });

  it('render table header', () => {
    screen.getByText('선택');
    screen.getByText('제목');
    screen.getByText('작성자');
    screen.getByText('작성일');
    screen.getByText('조회');
  });

  it('render liked posts', () => {
    screen.getByText('정신 차려 이 각박한 세상에서');
    screen.getByText('son7');
    screen.getByText('2022-11-22');
    screen.getByText(1122);
  });
});
