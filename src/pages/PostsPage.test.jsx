import { render } from '@testing-library/react';

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

test('postsPage', () => {
  posts = [
    {
      id: 1,
      title: '손흥민 득점왕 수상',
      category: 'EPL',
      author: '굉민재',
      commentNumber: 3,
      like: 20,
    },
  ];

  render(<PostsPage />);

  expect(fetchPosts).toBeCalled();
});
