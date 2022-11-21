import { fireEvent, render, screen } from '@testing-library/react';

import Post from './Post';

const countLike = jest.fn();
const modifyPost = jest.fn();
const deletePost = jest.fn();

const navigate = jest.fn();

const context = describe;

describe('Post', () => {
  beforeEach(() => {
    const posts = {
      post: {
        postInformation: {
          title: '이강인 손흥민과 한 팀??',
          content: '이강인 토트넘 이적 루머',
        },
        hit: 50,
        createdAt: '2022-10-31',
      },

      board: {
        boardName: {
          value: 'SerieA',
        },
      },

      user: {
        name: '이강인',
        identification: 'jel1y',
      },

      likes: [
        {
          id: 1,
          length: 1,
        },
      ],

      loginUser: {
        id: 1,
        identification: 'jel1y',
        name: '이강인',
      },

      comments: [],
    };

    const pages = {
      pageButtons: [1, 2, 3],
    };

    const comments = {};

    const accessToken = 'ACCESS.TOKEN';

    render(<Post
      posts={posts}
      pages={pages}
      comments={comments}
      countLike={countLike}
      modifyPost={modifyPost}
      deletePost={deletePost}
      accessToken={accessToken}
      navigate={navigate}
    />);
  });

  it('render title', () => {
    screen.getByText('이강인 손흥민과 한 팀??');
  });

  it('render content', () => {
    screen.getByText('이강인 토트넘 이적 루머');
  });

  it('render hit number', () => {
    screen.getByText('2022-10-31 조회 50');
  });

  it('render name', () => {
    screen.getByText('이강인');
  });

  it('render like button and call countLike button', () => {
    screen.getByText('좋아요');

    fireEvent.click(screen.getByText('좋아요'));

    expect(countLike).toBeCalled();
  });

  context('when click modify button', () => {
    it('modify to be called', () => {
      fireEvent.click(screen.getByText('수정'));

      expect(modifyPost).toBeCalled();
    });
  });

  context('when click delete button', () => {
    it('delte to be called', () => {
      fireEvent.click(screen.getByText('삭제'));

      expect(deletePost).toBeCalled();
    });
  });
});
