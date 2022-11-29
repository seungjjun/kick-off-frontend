import { useEffect } from 'react';

import BoardList from '../components/BoardList';

import useBoardStore from '../hooks/useBoardStore';

export default function BoardListPage() {
  const boardStore = useBoardStore();

  useEffect(() => {
    boardStore.fetchBoards();
  }, []);

  const changeBoard = (boardName) => {
    boardStore.boardName = boardName;
    boardStore.pageNumber = 0;
    boardStore.setKeyword();
  };

  return (
    <BoardList
      boardList={boardStore.boards}
      changeBoard={changeBoard}
    />
  );
}
