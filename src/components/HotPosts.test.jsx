import {
  cleanup, fireEvent, render, screen,
} from '@testing-library/react';

import HotPosts from './HotPosts';

const navigate = jest.fn();

let hotPosts = [];

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/useBoardStore', () => () => ({
  hotPosts,
}));

const context = describe;

describe('HotPosts', () => {
  beforeEach(() => {
    const accessToken = 'ACCESS.TOKEN';

    hotPosts = [
      {
        boards: {
          id: 1,
          boardName: 'EPL',
        },

        posts: {
          id: 1,
          postInformation: {
            title: '인기 게시글',
          },
          hit: 62,
        },

        users: {
          id: 1,
          name: '손흥민',
        },

        commentNumber: 3,
      },
    ];

    render((<HotPosts
      accessToken={accessToken}
    />));
  });

  context('when check posts', () => {
    it('render hot posts information', () => {
      screen.getByText('인기 게시글 [3]');

      screen.getByText('EPL');
      screen.getByText('손흥민');
      screen.getByText('62');

      cleanup();
    });
  });

  context('when click posts title', () => {
    it('run navigate function', () => {
      fireEvent.click(screen.getByText('인기 게시글 [3]'));

      expect(navigate).toBeCalledWith('/post/1');

      cleanup();
    });
  });

  context('when click board name', () => {
    it('run navigate function', () => {
      fireEvent.click(screen.getByText('EPL'));

      expect(navigate).toBeCalledWith('/board?id=1');

      cleanup();
    });
  });

  context('when click user name', () => {
    it('run navigate function', () => {
      fireEvent.click(screen.getByText('손흥민'));

      expect(navigate).toBeCalledWith('/users?nickname=손흥민', { state: 1 });

      cleanup();
    });
  });
});
