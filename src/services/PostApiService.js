/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class PostApiService {
  async fetchPost(postId) {
    const url = `${baseUrl}/posts/${postId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchApplicationPosts(accessToken) {
    const url = `${baseUrl}/application`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async write(title, content, boardId, imageUrl, userId) {
    const url = `${baseUrl}/post`;

    const { data } = await axios.post(url, {
      title,
      content,
      boardId,
      imageUrl,
      userId,
    });

    return data;
  }

  async patch(title, content, boardId, imageUrl, postId) {
    const url = `${baseUrl}/posts/${postId}`;

    await axios.patch(url, {
      title,
      content,
      boardId,
      imageUrl,
    });
  }

  async deletePost(postId) {
    const url = `${baseUrl}/posts/${postId}`;

    await axios.delete(url);
  }

  async deletePosts(checkedPosts) {
    const url = `${baseUrl}/posts`;

    const postsId = [...checkedPosts];

    await axios.delete(url, {
      data: {
        postsId,
      },
    });
  }

  async upload(formData) {
    const url = `${baseUrl}/upload`;
    const { data } = await axios.post(url, formData);

    return data;
  }
}

export const postApiService = new PostApiService();
