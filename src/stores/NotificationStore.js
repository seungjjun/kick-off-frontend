import { notificationApiService } from '../services/NotificationApiService';

import Store from './Store';

export default class NotificationStore extends Store {
  constructor() {
    super();

    this.notification = [];

    this.isCheckNotification = '';
  }

  async fetchNotification() {
    const data = await notificationApiService.fetchNotification();

    this.notification = data;

    this.publish();
  }

  async read(notificationId) {
    await notificationApiService.read(notificationId);

    this.fetchNotification();

    this.checkNotification();

    this.publish();
  }

  async checkNotification() {
    const data = await notificationApiService.checkNotification();

    this.isCheckNotification = data;

    this.publish();
  }

  async deleteNotification(notificationId) {
    await notificationApiService.deleteNotification(notificationId);

    this.fetchNotification();

    this.checkNotification();

    this.publish();
  }

  async deleteAll() {
    await notificationApiService.deleteAll();

    this.fetchNotification();

    this.checkNotification();

    this.publish();
  }

  async deleteReadNotification() {
    await notificationApiService.deleteReadNotification();

    this.fetchNotification();

    this.checkNotification();

    this.publish();
  }

  addNotification(notification) {
    this.notification = [...this.notification, {
      id: notification.id,
      sender: notification.sender,
      content: notification.content,
      read: notification.read,
      postId: notification.postId,
    }];

    this.publish();
  }
}

export const notificationStore = new NotificationStore();
