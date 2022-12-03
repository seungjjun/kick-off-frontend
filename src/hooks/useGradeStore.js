import { useEffect } from 'react';

import { gradeStore } from '../stores/GradeStore';

import useForceUpdate from './useForceUpdate';

export default function useGradeStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    gradeStore.subscribe(forceUpdate);

    return () => gradeStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return gradeStore;
}
