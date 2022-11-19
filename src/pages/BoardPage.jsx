import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import Board from '../components/Board';

import useBoardStore from '../hooks/useBoardStore';

export default function BoardPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const path = location.search;

  const boardId = path.split('=')[1];

  const boardStore = useBoardStore();

  const navigate = useNavigate();

  const { pageNumber } = boardStore;

  useEffect(() => {
    boardStore.changePageNumber(pageNumber);
    boardStore.fetchPosts(pageNumber, boardId);

    boardStore.makePage();
  }, [location, pageNumber]);

  const changePageNumber = (pageNubmer) => {
    boardStore.changePageNumber(pageNubmer);
  };

  const nextPage = () => {
    boardStore.nextPage();
  };

  const previousPage = () => {
    boardStore.previousPage();
  };

  const { comments } = boardStore;
  const { recomments } = boardStore;

  const commentNumber = comments.map((comment) => (
    comment.deleted ? null : comment.postId
  ));

  const recommentNumber = recomments.map((recomment) => recomment.postId);

  const { startPage } = boardStore.page;
  const { lastPage } = boardStore.page;
  const { currentLastPage } = boardStore.page;

  const isPreviousPage = startPage > 1;
  const isNextPage = lastPage < currentLastPage;

  const pagination = {
    changePageNumber,
    nextPage,
    previousPage,
    isPreviousPage,
    isNextPage,
    pageButtons: boardStore.pageButton,
  };

  return (
    <Board
      accessToken={accessToken}
      posts={boardStore.posts}
      navigate={navigate}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      pagination={pagination}
    />
  );
}
