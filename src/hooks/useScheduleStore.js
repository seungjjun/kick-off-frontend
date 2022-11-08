import { useEffect } from 'react';

import { scheduleStore } from '../stores/ScheduleStore';

import useForceUpdate from './useForceUpdate';

export default function useScheduleStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    scheduleStore.subscribe(forceUpdate);

    return () => scheduleStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return scheduleStore;
}
