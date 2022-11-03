/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class PostApiService {
  async fetchPosts() {
    const url = `${baseUrl}/posts`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchPost(postId) {
    const url = `${baseUrl}/posts/${postId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async write(title, content, categoryId, imageUrl, userId) {
    const url = `${baseUrl}/post`;

    const { data } = await axios.post(url, {
      title,
      content,
      categoryId,
      imageUrl,
      userId,
    });

    return data;
  }

  async upload(formData) {
    const url = `${baseUrl}/upload`;
    const { data } = await axios.post(url, formData);

    return data;
  }

  async like(postId, userId) {
    const url = `${baseUrl}/like`;
    const { data } = await axios.post(url, {
      postId,
      userId,
    });

    return data;
  }
}

export const postApiService = new PostApiService();
