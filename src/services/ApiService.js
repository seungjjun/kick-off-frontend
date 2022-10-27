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
}

export const apiService = new ApiService();
