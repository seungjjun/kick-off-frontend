/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class UserApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchUsers() {
    const url = `${baseUrl}/users`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchUser() {
    const url = `${baseUrl}/users/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async login({ userId, password }) {
    const url = `${baseUrl}/session`;

    const { data } = await axios.post(url, {
      identification: userId,
      password,
    });

    return data;
  }
}

export const userApiService = new UserApiService();
