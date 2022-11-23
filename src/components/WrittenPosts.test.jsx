import { render, screen } from '@testing-library/react';
import WrittenPosts from './WrittenPosts';

describe('WrittenPosts', () => {
  beforeEach(() => {
    const myInformation = {
      posts: [
        {
          id: 1,
          postInformation: {
            title: '손흥민 가나전 해트트릭',
          },
          createdAt: '2022-11-25',
          hit: 912,
        },
      ],

      user: {
        name: '피카츄',
      },
    };

    render(<WrittenPosts
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

  it('render posts', () => {
    screen.getByText('손흥민 가나전 해트트릭');
    screen.getByText('피카츄');
    screen.getByText('2022-11-25');
    screen.getByText(912);
  });
});
