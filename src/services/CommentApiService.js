/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class CommentApiService {
  async fetchComments() {
    const url = `${baseUrl}/comments`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchComment(postId, commentPageNumber) {
    const url = `${baseUrl}/posts/${postId}/comments`;

    const { data } = await axios.get(url, {
      params: {
        page: commentPageNumber,
      },
    });

    return data;
  }

  async fetchRecomments() {
    const url = `${baseUrl}/recomments`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchRecomment(postId) {
    const url = `${baseUrl}/posts/${postId}/recomments`;

    const { data } = await axios.get(url);

    return data;
  }

  async createComment(content, postId, userId) {
    const url = `${baseUrl}/comment`;

    await axios.post(url, {
      content,
      postId,
      userId,
    });
  }

  async createRecomment(content, commentId, postId, userId) {
    const url = `${baseUrl}/recomment`;

    await axios.post(url, {
      content,
      commentId,
      postId,
      userId,
    });
  }
}

export const commentApiService = new CommentApiService();
