/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class CategoryApiService {
  async fetchCategory() {
    const url = `${baseUrl}/category`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const categoryApiService = new CategoryApiService();
