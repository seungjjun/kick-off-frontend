/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => res(ctx.json({
    posts: [
      {
        title: '손흥민 득점왕 수상',
        category: 'EPL',
        author: '굉민재',
        commentNumber: 3,
        like: 20,
      },
    ],
  }))),

  rest.post(`${baseUrl}/post`, async (req, res, ctx) => {
    const {
      title, content, categoryId, image, userId,
    } = await req.json();
    return res(ctx.json({
      title,
      content,
      categoryId,
      image,
      userId,
    }));
  }),

  rest.get(`${baseUrl}/post/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    title: '대만힌국 16강 진출',
    content: '카타르 월드컵 대한민국 16강 진출',
    author: 'jel1y',
    category: 'EPL',
    hit: 1,
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

);

export default server;
