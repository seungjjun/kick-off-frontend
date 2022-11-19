/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { identification, password } = await req.json();
    if (identification === 'jel1y' && password === 'Qwe1234!') {
      return res(ctx.json({
        accessToekn: 'ACCESS.TOKEN',
        name: '노승준',
        profileImage: 'profileImage',
        gradeName: 'World Class',
      }));
    }

    if (identification === '') {
      return res(
        ctx.status(400),
        ctx.json({
          message: '아이디를 입력해주세요',
        }),
      );
    }

    if (password === '') {
      return res(
        ctx.status(400),
        ctx.json({
          message: '비밀번호를 입력해주세요',
        }),
      );
    }
  }),

  rest.get(`${baseUrl}/boards`, (req, res, ctx) => res(ctx.json({
    board: [
      {
        id: 1,
        boardName: {
          value: '전체게시판',
        },
      },
      {
        id: 2,
        boardName: {
          value: 'EPL',
        },
      },
      {
        id: 3,
        boardName: {
          value: 'SerieA',
        },
      },
    ],
  }))),

  rest.get(`${baseUrl}/board/1/posts`, (req, res, ctx) => res(ctx.json({
    posts: {
      posts: [
        {
          id: 1,
          postInformation: {
            title: '손흥민 득점왕',
          },
          boardId: 1,
          hit: 100,
          imageUrl: 'imageUrl',
          userId: {
            userId: 1,
          },
          createdAt: '2022-11-22',
        },
      ],

      comments: [
        {
          id: 1,
          content: '1번째 게시글의 댓글',
          userId: 3,
          postId: 1,
          commentDate: '2022-11-01',
        },
        {
          id: 2,
          content: '2번째 게시글의 댓글',
          userId: 3,
          postId: 2,
          commentDate: '2022-11-01',
        },
      ],

      recomments: [
        {
          id: 3,
          content: '1번째 댓글의 대댓글',
          commentId: 1,
          postId: 1,
          userId: 3,
        },
      ],

      boards: [
        {
          id: 1,
          boardName: {
            value: 'EPL',
          },
        },
      ],

      users: [
        {
          id: 1,
          identification: 'jel1y',
          name: 'son7',

        },
      ],

      likes: [
        {
          id: 1,
          postId: 1,
          userId: 1,
        },
      ],
    },

    page: [
      {
        currentLastPage: 3,
        currentPageNumber: 1,
        lastPage: 3,
        startPage: 1,
        totalPageNumber: 21,
      },
    ],
  }))),

  rest.post(`${baseUrl}/post`, async (req, res, ctx) => {
    const {
      title, content, categoryId, image, userId,
    } = await req.json();
    return res(ctx.json({
      id: 5,
    }));
  }),

  rest.get(`${baseUrl}/posts/1`, async (req, res, ctx) => res(ctx.json({
    post: {
      id: 1,
      board: {
        id: 1,
        boardName: {
          value: '전체게시판',
        },
      },
      postInformation: {
        title: '대만힌국 16강 진출',
        content: '카타르 월드컵 대한민국 16강 진출',
      },
      user: {
        id: 4,
        identification: 'jel1y',
        name: 'son7',
        profileImage: 'profileImage',
      },
      createdAt: '2017-02-16',
      imageUrl: 'imageUrl',
      hit: 10,
    },
  }))),

  rest.post(`${baseUrl}/upload`, async (req, res, ctx) => {
    const { imageUrl } = await req.json();
    return res(ctx.json({
      imageUrl: 'imageUrl',
    }));
  }),

  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    identification: 'jel1y',
    name: 'Pikachu',
    profileImage: 'imageUrl',
  }))),

  rest.get(`${baseUrl}/comments`, async (req, res, ctx) => res(ctx.json({
    comments: [
      {
        id: 1,
        content: '댓글이다',
        postId: 1,
        userId: 3,
        commentDate: '2022-10-30',
      },
    ],
  }))),

  rest.get(`${baseUrl}/recomments`, async (req, res, ctx) => res(ctx.json({
    recomments: [
      {
        id: 1,
        content: '대댓글이다',
        commentId: 1,
        postId: 1,
        userId: 3,
      },
    ],
  }))),

  rest.get(`${baseUrl}/posts/1/comments`, async (req, res, ctx) => res(ctx.json({
    comments: [
      {
        id: 1,
        content: '첫번째 게시글의 댓글',
        postId: 1,
        userId: 3,
        commentDate: '2022-10-31',
      },
    ],

    recomments: [
      {
        id: 1,
        content: '첫번째 게시글의 댓글의 대댓글',
        commentId: 1,
        postId: 1,
        userId: 3,
      },
    ],

    page: [
      {
        currentLastPage: 5,
        currentPageNumber: 1,
        lastPage: 5,
        startPage: 1,
        totalPageNumber: 5,
      },
    ],
  }))),

  rest.get(`${baseUrl}/posts/1/recomments`, async (req, res, ctx) => res(ctx.json({
    recomments: [
      {
        id: 1,
        content: '첫번째 게시글의 댓글의 대댓글',
        commentId: 1,
        postId: 1,
        userId: 1,
        commentDate: '2022-11-08',
      },
    ],
  }))),

  rest.get(`${baseUrl}/likes`, async (req, res, ctx) => res(ctx.json({
    likes: [
      {
        id: 110,
        postId: 20,
        userId: 1,
      },
    ],
  }))),

  rest.get(`${baseUrl}/category`, async (req, res, ctx) => res(ctx.json({
    categories: [
      {
        id: 1,
        name: 'EPL',
        parentId: 1,
      },
    ],
  }))),

  rest.get(`${baseUrl}/category/3`, async (req, res, ctx) => res(ctx.json({
    categoryPosts: {
      categories: {
        id: 3,
        name: 'LaLiga',
      },
      comments: [
        {
          id: 1,
          content: '1번째 게시글의 댓글',
          userId: 1,
          postId: 10,
          commentDate: '2022-11-01',
        },
      ],
      likes: [
        {
          id: 2,
          postId: 10,
          userId: 1,
        },
      ],
      posts: [
        {
          id: 10,
          title: '이강인 라리가 베스트 일레븐',
          categoryId: 3,
          hit: 10,
          imageUrl: 'imageUrl',
          userId: 1,
        },
      ],
      users: [
        {
          id: 1,
          identification: 'Pikachu',
          name: 'Lee',
          profileImage: 'profileImage',
        },
      ],
    },

    page: [
      {
        currentLastPage: 6,
        currentPageNumber: 1,
        lastPage: 6,
        startPage: 1,
        totalPageNumber: 11,
      },
    ],
  }))),

  rest.get(`${baseUrl}/users`, async (req, res, ctx) => res(ctx.json({
    users: [
      {
        id: 1,
        identification: 'jel1y',
        name: 'son7',
        profileImage: 'image',
      },
      {
        id: 2,
        identification: 'app1e',
        name: 'pikachu',
        profileImage: 'image',
      },
    ],
  }))),
);

export default server;
