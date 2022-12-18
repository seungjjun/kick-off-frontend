/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class NotificationApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchNotification() {
    const url = `${baseUrl}/notifications`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data.notifications;
  }

  async read(notificationId) {
    const url = `${baseUrl}/notifications/${notificationId}`;

    await axios.patch(url);
  }

  async checkNotification() {
    const url = `${baseUrl}/notification`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async deleteNotification(notificationId) {
    const url = `${baseUrl}/notifications/${notificationId}`;

    await axios.delete(url);
  }

  async deleteAll() {
    const url = `${baseUrl}/notifications`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async deleteReadNotification() {
    const url = `${baseUrl}/notifications/read`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export const notificationApiService = new NotificationApiService();
