/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async fetchPosts() {
    const url = `${baseUrl}/posts`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchPost(postId) {
    const url = `${baseUrl}/post/${postId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async write(title, content, category) {
    const url = `${baseUrl}/post`;

    const { data } = await axios.post(url, {
      title, content, category,
    });

    return data;
  }
}

export const apiService = new ApiService();
