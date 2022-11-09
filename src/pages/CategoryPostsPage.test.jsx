import { render, screen } from '@testing-library/react';
import CategoryPostsPage from './CategoryPostsPage';

const fetchCategoryPosts = jest.fn();
const fetchComments = jest.fn();
const fetchRecomments = jest.fn();
const fetchUsers = jest.fn();
const fetchCategory = jest.fn();
const fetchLike = jest.fn();

const navigate = jest.fn();

let location = {};

let posts = [];
let likes = [];
let users = [];
let categories = [];
let comments = [];
let recomments = [];

jest.mock('../hooks/usePostStore', () => () => ({
  fetchCategoryPosts,
  posts,
}));

jest.mock('../hooks/useCommentStore', () => () => ({
  fetchComments,
  fetchRecomments,
  comments,
  recomments,
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchUsers,
  users,
}));

jest.mock('../hooks/useLikeStore', () => () => ({
  fetchLike,
  likes,
}));

jest.mock('../hooks/useCategoryStore', () => () => ({
  fetchCategory,
  categories,
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useLocation() {
    return location;
  },
}));

describe('CategoryPostPage', () => {
  beforeEach(() => {
    posts = [
      {
        postInformation: {
          title: '2022년 카타르 월드컵 개막',
        },
        id: 1,
        categoryId: 1,
        hit: 100,
        imageUrl: 'imageUrl',
        userId: {
          userId: 1,
        },
        createdAt: '2022-11-22',
      },
    ];

    comments = [
      {
        id: 1,
        content: '벌써 카타르 월드컵이 개막을??',
        userId: 1,
        postId: 1,
        commentDate: '2022-11-22',
      },
    ];

    likes = [
      {
        id: 5,
        postId: 1,
        userId: 1,
      },
    ];

    categories = [
      {
        id: 1,
        name: '전체 게시판',
      },
    ];

    users = [
      {
        id: 1,
        identification: 'jel1y',
        name: '쏘온',
        profileImage: 'profileImage',
      },
    ];

    recomments = [
      {
        id: 1,
        postId: 1,
      },
    ];

    location = {
      pathname: '/posts',
      search: '?category=1',
      hash: '',
      state: null,
      key: 'default',
    };

    render(<CategoryPostsPage />);
  });

  it('render board category name', () => {
    screen.getByText('전체 게시판');
  });

  it('render post title', () => {
    screen.getByText('2022년 카타르 월드컵 개막 [2]');
  });

  it('render category and name', () => {
    screen.getByText('전체 게시판 / 쏘온');
  });

  it('render hit and post date', () => {
    screen.getByText('1 2022-11-22 100');
  });
});
