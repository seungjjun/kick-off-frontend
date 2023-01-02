/* eslint-disable prefer-destructuring */
import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import Board from '../components/Board';

import useBoardStore from '../hooks/useBoardStore';
import useUserStore from '../hooks/useUserStore';

export default function BoardPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const path = location.search;

  let boardId = path.split('=')[1];

  if (!location.search) {
    boardId = 1;
  }

  if (location.search.includes('&')) {
    boardId = path.split('=')[1].split('&')[0];
  }

  const boardStore = useBoardStore();

  const userStore = useUserStore();

  const navigate = useNavigate();

  const { pageNumber } = boardStore;

  const { keyword } = boardStore;

  useEffect(() => {
    if (!keyword) {
      boardStore.changePageNumber(pageNumber);
      boardStore.fetchPosts(pageNumber, boardId);
      boardStore.fetchHotPosts();
    }

    if (keyword) {
      boardStore.searchPosts({ keyword, boardId, pageNumber });
    }

    if (accessToken) {
      userStore.fetchMyInformation();
    }

    boardStore.makePage();
  }, [location, pageNumber]);

  const changePageNumber = async (pageNubmer) => {
    boardStore.changePageNumber(pageNubmer);

    navigate(`/board?id=${boardId}&page=${pageNubmer + 1}`);

    if (boardStore.keyword) {
      navigate(`/board?id=${boardId}&keyword=${boardStore.keyword}&page=${pageNubmer + 1}`);
    }
  };

  const changeKeywordType = (type) => {
    boardStore.changeKeywordType(type);
  };

  const submit = async (data, event) => {
    const { keyword } = data;

    boardStore.changeKeyword(keyword);

    navigate(`/board?id=${boardId}&keyword=${keyword}&page=1`);

    await boardStore.searchPosts({
      keyword, boardId, pageNumber: 0,
    });

    event.target.reset();
  };

  const nextPage = () => {
    boardStore.nextPage();
  };

  const previousPage = () => {
    boardStore.previousPage();
  };

  const moveToUserPage = (userName, userId) => {
    navigate(`/users?nickname=${userName}`, { state: userId });
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
      boardName={boardStore.boardName}
      boardId={boardId}
      posts={boardStore.posts}
      navigate={navigate}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      pagination={pagination}
      submit={submit}
      changeKeywordType={changeKeywordType}
      moveToUserPage={moveToUserPage}
    />
  );
}
