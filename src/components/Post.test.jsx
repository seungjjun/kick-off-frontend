import { fireEvent, render, screen } from '@testing-library/react';

import Post from './Post';

const countLike = jest.fn();

describe('Post', () => {
  beforeEach(() => {
    const post = {
      postInformation: {
        title: '이강인 손흥민과 한 팀??',
        content: '이강인 토트넘 이적 루머',
      },
      hit: 50,
      createdAt: '2022-10-31',
    };

    const category = {
      name: 'SerieA',
    };

    const user = {
      name: '이강인',
    };

    const likes = [
      {
        id: 1,
        length: 1,
      },
    ];

    const comments = {};

    render(<Post
      post={post}
      category={category}
      likes={likes}
      comments={comments}
      user={user}
      countLike={countLike}
    />);
  });

  it('render title', () => {
    screen.getByText('제목: 이강인 손흥민과 한 팀??');
  });

  it('render content', () => {
    screen.getByText('내용: 이강인 토트넘 이적 루머');
  });

  it('render hit number', () => {
    screen.getByText('조회수: 50');
  });

  it('render category and name', () => {
    screen.getByText('SerieA / 이강인');
  });

  it('render like button and call countLike button', () => {
    screen.getByText('좋아요');

    fireEvent.click(screen.getByText('좋아요'));

    expect(countLike).toBeCalled();
  });
});
