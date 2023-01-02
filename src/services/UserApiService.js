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

  async fetchUser(userName) {
    const url = `${baseUrl}/user`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },

      params: {
        userName,
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

  async fetchMyInformation() {
    const url = `${baseUrl}/users/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async updateProfile(userId, name, profileImage) {
    const url = `${baseUrl}/users/${userId}`;

    const { data } = await axios.patch(url, {
      name,
      profileImage,
    });

    return data;
  }

  async register({
    name, identification, password, confirmPassword,
  }) {
    const url = `${baseUrl}/users`;
    const { data } = await axios.post(url, {
      name, identification, password, confirmPassword,
    });
    return data.name;
  }

  async kakaoLogin(code) {
    const url = `${baseUrl}/auth/token`;

    const { data } = await axios.get(url, {
      params: { code },
    });

    return data;
  }

  async upload(formData) {
    const url = `${baseUrl}/upload`;
    const { data } = await axios.post(url, formData);

    return data;
  }
}

export const userApiService = new UserApiService();
