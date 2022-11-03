/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class CommentApiService {
  async fetchComment(postId) {
    const url = `${baseUrl}/posts/${postId}/comments`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const commentApiService = new CommentApiService();
