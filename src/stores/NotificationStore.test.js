import { notificationApiService } from '../services/NotificationApiService';
import NotificationStore from './NotificationStore';

const context = describe;

describe('NotificationStore', () => {
  let notificationStore;

  beforeEach(() => {
    notificationStore = new NotificationStore();
  });

  context('when fetch notifications', () => {
    it('render all notifications', async () => {
      notificationApiService.setAccessToken('jel1y');

      await notificationStore.fetchNotification();

      const { notification } = notificationStore;

      expect(notification[0].id).toBe(1);
      expect(notification[0].content).toBe('흥민존');
      expect(notification[0].sender).toBe('손흥민');
      expect(notification[0].createdAt).toBe('2022-12-17');
    });
  });

  context('when read notification', () => {
    it('run read function', async () => {
      await notificationApiService.read(1);
    });
  });

  context('when check reading state of notifications', () => {
    it('can check notification state', async () => {
      notificationApiService.setAccessToken('jel1y');

      await notificationStore.checkNotification();

      expect(notificationStore.isCheckNotification).toBe(true);
    });
  });

  context('when delete notifications', () => {
    it('run delete notification function', async () => {
      await notificationStore.deleteNotification(1);
    });
  });

  context('when delete all notifications', () => {
    it('run delete all notification function', async () => {
      notificationApiService.setAccessToken('jel1y');

      await notificationStore.deleteAll();
    });
  });
});
