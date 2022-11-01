/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserApiService {
  async fetchUser() {
    const url = `${baseUrl}/users/me`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const userApiService = new UserApiService();
