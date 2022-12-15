import { useEffect } from 'react';

import { notificationStore } from '../stores/NotificationStore';

import useForceUpdate from './useForceUpdate';

export default function useNotificationStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    notificationStore.subscribe(forceUpdate);

    return () => notificationStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return notificationStore;
}
