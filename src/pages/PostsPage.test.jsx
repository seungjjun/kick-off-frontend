import { render, screen } from '@testing-library/react';

import PostsPage from './PostsPage';

const fetchPosts = jest.fn();
const navigate = jest.fn();

let posts = [];
let comments = [];
let likes = [];
let users = [];
let categories = [];
let recomments = [];

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPosts,
  posts,
  comments,
  likes,
  users,
  categories,
  recomments,
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
        id: 1,
        title: '손흥민 득점왕 수상',
        categoryId: 1,
        hit: 25,
        imageUrl: 'imageUrl',
        userId: 3,
        createdAt: '2022-11-01',
      },
    ];
    comments = [
      {
        id: 1,
        content: '1번째 게시글의 댓글',
        userId: 3,
        postId: 1,
        commentDate: '2022-11-01',
      },
    ];
    likes = [
      {
        id: 5,
        postId: 1,
        userId: 3,
      },
    ];
    categories = [
      {
        id: 1,
        name: 'EPL',
      },
    ];
    users = [
      {
        id: 3,
        identification: 'jel1y',
        name: '굉민재',
        profileImage: 'profileImage',
      },
    ];

    recomments = [
      {
        id: 1,
        postId: 1,
      },
    ];

    render(<PostsPage />);
  });

  it('fetch posts', () => {
    expect(fetchPosts).toBeCalled();
  });

  it('render write button', () => {
    screen.getByText('글쓰기');
  });

  it('render title and comment number', () => {
    screen.getByText('손흥민 득점왕 수상 [2]');
  });

  it('render likes, createdAt, hit', () => {
    screen.getByText('1 2022-11-01 25');
  });

  it('render category, Name', () => {
    screen.getByText('EPL / 굉민재');
  });
});
