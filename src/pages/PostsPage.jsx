import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Posts from '../components/Posts';

import usePostStore from '../hooks/usePostStore';

export default function PostsPage() {
  const postStore = usePostStore();

  const navigate = useNavigate();

  const { pageNumber } = postStore;

  useEffect(() => {
    postStore.fetchPosts(pageNumber);

    postStore.makePage();
  }, [pageNumber]);

  const changePageNumber = (pageNubmer) => {
    postStore.changePageNumber(pageNubmer);
  };

  const nextPage = () => {
    postStore.nextPage();
  };

  const previousPage = () => {
    postStore.previousPage();
  };

  const { comments } = postStore;
  const { recomments } = postStore;

  const commentNumber = comments.map((comment) => comment.postId);
  const recommentNumber = recomments.map((recomment) => recomment.postId);

  const { startPage } = postStore.page;
  const { lastPage } = postStore.page;
  const { currentLastPage } = postStore.page;

  const isPreviousPage = startPage > 1;
  const isNextPage = lastPage < currentLastPage;

  return (
    <Posts
      posts={postStore.posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={postStore.likes}
      users={postStore.users}
      categories={postStore.categories}
      navigate={navigate}
      changePageNumber={changePageNumber}
      nextPage={nextPage}
      previousPage={previousPage}
      pageButtons={postStore.pageButton}
      isPreviousPage={isPreviousPage}
      isNextPage={isNextPage}
    />
  );
}
