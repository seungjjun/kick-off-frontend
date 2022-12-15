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

  async createComment(content, postId, userId, receiverId) {
    const url = `${baseUrl}/comments`;

    await axios.post(url, {
      content,
      postId,
      userId,
      receiverId,
    });
  }

  async createRecomment(content, commentId, postId, userId) {
    const url = `${baseUrl}/recomments`;

    await axios.post(url, {
      content,
      commentId,
      postId,
      userId,
    });
  }

  async modifyComment(content, commentId) {
    const url = `${baseUrl}/comments/${commentId}`;

    await axios.patch(url, {
      content,
    });
  }

  async modifyRecomment(content, recommentId) {
    const url = `${baseUrl}/recomments/${recommentId}`;

    await axios.patch(url, {
      content,
    });
  }

  async deleteComment(commentId) {
    const url = `${baseUrl}/comments/${commentId}`;

    await axios.delete(url);
  }

  async deleteRecomment(recommentId) {
    const url = `${baseUrl}/recomments/${recommentId}`;

    await axios.delete(url);
  }

  async deleteComments(checkedComments) {
    const url = `${baseUrl}/comments`;

    await axios.delete(url, {
      data: {
        commentId: checkedComments,
      },
    });
  }

  async deleteRecomments(checkedRecomments) {
    const url = `${baseUrl}/recomments`;

    await axios.delete(url, {
      data: {
        recommentId: checkedRecomments,
      },
    });
  }
}

export const commentApiService = new CommentApiService();
