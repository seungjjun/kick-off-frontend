/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class LikeApiService {
  async fetchLike() {
    const url = `${baseUrl}/likes`;

    const { data } = await axios.get(url);

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

  async cancelCheckedPost(checkedPosts) {
    const url = `${baseUrl}/likes`;

    await axios.delete(url, {
      data: {
        likeId: checkedPosts,
      },
    });
  }
}

export const likeApiService = new LikeApiService();
