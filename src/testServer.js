/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => res(ctx.json({
    posts: [
      {
        categories: {
          id: 1,
          name: 'EPL',
        },
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
        likes: [
          {
            id: 5,
            postId: 1,
            userId: 3,
          },
        ],
        posts: [
          {
            id: 1,
            title: '손흥민 득점왕',
            categoryId: 1,
            hit: 25,
            imageUrl: 'imageUrl',
            userId: 3,
          },
        ],
        users: [
          {
            id: 3,
            identification: 'jel1y',
            name: 'son7',
            profileImage: 'profileImage',
          },
        ],
      },

    ],
  }))),

  rest.post(`${baseUrl}/post`, async (req, res, ctx) => {
    const {
      title, content, categoryId, image, userId,
    } = await req.json();
    return res(ctx.json({
      postId: 5,
    }));
  }),

  rest.get(`${baseUrl}/posts/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    title: '대만힌국 16강 진출',
    content: '카타르 월드컵 대한민국 16강 진출',
    hit: 10,
    createdAt: '2017-02-16',
    imageUrl: 'imageUrl',
    category: {
      id: 1,
      name: 'EPL',
    },
    likes: {
      id: 2,
      postId: 1,
      userId: 4,
    },
    user: {
      id: 4,
      identification: 'jel1y',
      name: 'son7',
      profileImage: 'profileImage',
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
  }))),

);

export default server;
