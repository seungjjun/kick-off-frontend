import { fireEvent, render, screen } from '@testing-library/react';

import Post from './Post';

const countLike = jest.fn();
const modifyPost = jest.fn();
const deletePost = jest.fn();

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

      category: {
        name: 'SerieA',
      },

      user: {
        name: '이강인',
      },

      likes: [
        {
          id: 1,
          length: 1,
        },
      ],

      comments: [],
    };

    const pages = {
      pageButtons: [1, 2, 3],
    };

    const comments = {};

    render(<Post
      posts={posts}
      pages={pages}
      comments={comments}
      countLike={countLike}
      modifyPost={modifyPost}
      deletePost={deletePost}
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
