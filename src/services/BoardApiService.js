/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class BoardApiService {
  async fetchBoards() {
    const url = `${baseUrl}/boards`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchPosts(pageNumber = 0, boardId = 1) {
    const url = `${baseUrl}/boards/${boardId}/posts`;

    const { data } = await axios.get(url, {
      params: {
        page: pageNumber,
      },
    });

    return data;
  }

  async fetchHotPosts() {
    const url = `${baseUrl}/boards/posts/hot`;

    const { data } = await axios.get(url);

    return data;
  }

  async searchPosts({
    keyword, keywordType, boardId = 1, pageNumber = 0,
  }) {
    const url = `${baseUrl}/boards/${boardId}/posts/search`;

    const { data } = await axios.get(url, {
      params: {
        page: pageNumber,
        keywordType,
        keyword,
      },
    });

    return data;
  }
}

export const boardApiService = new BoardApiService();
