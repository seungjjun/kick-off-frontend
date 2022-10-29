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
    const { title, content, category } = await req.json();
    return res(ctx.json({
      title,
      content,
      category,
    }));
  }),

);

export default server;
