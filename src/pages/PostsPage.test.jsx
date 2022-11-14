import { render, screen } from '@testing-library/react';

import PostsPage from './PostsPage';

const fetchPosts = jest.fn();
const navigate = jest.fn();

const makePage = jest.fn();
const changePageNumber = jest.fn();
const nextPage = jest.fn();
const previousPage = jest.fn();

let posts = [];

let comments = [];
let recomments = [];

let page = {};
let pageButton = [];

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPosts,
  makePage,
  changePageNumber,
  nextPage,
  previousPage,
  posts,
  page,
  pageButton,
  comments,
  recomments,
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('postsPage', () => {
  beforeEach(() => {
    posts = {
      posts: [
        {
          id: 1,
          postInformation: {
            title: '손흥민 득점왕 수상',
          },
          categoryId: 1,
          hit: 25,
          imageUrl: 'imageUrl',
          userId: {
            userId: 3,
          },
          createdAt: '2022-11-01',
        },
      ],

      categories: [
        {
          id: 1,
          name: 'EPL',
        },
      ],

      users: [
        {
          id: 3,
          identification: 'jel1y',
          name: '굉민재',
          profileImage: 'profileImage',
        },
      ],

      likes: [
        {
          id: 5,
          postId: 1,
          userId: 3,
        },
      ],
    };

    comments = [
      {
        id: 1,
        content: '1번째 게시글의 댓글',
        userId: 3,
        postId: 1,
        commentDate: '2022-11-01',
      },
    ];

    recomments = [
      {
        id: 1,
        postId: 1,
      },
    ];

    page = {
      startPage: 1,
      lastPage: 10,
      currentLastPage: 11,
    };

    pageButton = [1, 2, 3];
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

  it('render page buttons', () => {
    screen.getByText('1');
    screen.getByText('2');
    screen.getByText('3');
  });

  it('render next page button', () => {
    screen.getByText('다음');
  });
});
