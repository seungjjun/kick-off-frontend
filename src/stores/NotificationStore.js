import Store from './Store';

export default class NotificationStore extends Store {
  constructor() {
    super();

    this.notification = {};
  }

  addNotification(notification) {
    this.notification = notification;

    this.publish();
  }
}

export const notificationStore = new NotificationStore();
