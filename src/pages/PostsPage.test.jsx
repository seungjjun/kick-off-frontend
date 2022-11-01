import { render, screen } from '@testing-library/react';

import PostsPage from './PostsPage';

const fetchPosts = jest.fn();
const navigate = jest.fn();
let posts = [];

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPosts,
  posts,
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('postsPage', () => {
  beforeEach(() => {
    posts = [
      {
        category: {
          id: 1,
          name: 'EPL',
        },
        comments: {
          id: 1,
          length: 1,
        },
        user: {
          id: 1,
          name: '굉민재',
        },
        likes: {
          id: 1,
          length: 1,
        },
        id: 1,
        title: '손흥민 득점왕 수상',
        createdAt: '2022-10-30',
        hit: 10,
        imageUrl: 'imageUrl',
      },
    ];

    render(<PostsPage />);
  });

  it('fetch posts', () => {
    expect(fetchPosts).toBeCalled();
  });

  it('render title and comment number', () => {
    screen.getByText('손흥민 득점왕 수상 [1]');
  });

  it('render likes, createdAt, hit', () => {
    screen.getByText('1 2022-10-30 10');
  });

  it('render category, Name', () => {
    screen.getByText('EPL / 굉민재');
  });
});
