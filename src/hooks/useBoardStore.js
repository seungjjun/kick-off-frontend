import { useEffect } from 'react';

import { boardStore } from '../stores/BoardStore';

import useForceUpdate from './useForceUpdate';

export default function useBoardStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    boardStore.subscribe(forceUpdate);

    return () => boardStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return boardStore;
}
