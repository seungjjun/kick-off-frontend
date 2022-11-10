import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Posts from '../components/Posts';

import usePostStore from '../hooks/usePostStore';
import useCommentStore from '../hooks/useCommentStore';
import useUserStore from '../hooks/useUserStore';
import useLikeStore from '../hooks/useLikeStore';
import useCategoryStore from '../hooks/useCategoryStore';

export default function PostsPage() {
  const postStore = usePostStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();
  const likeStore = useLikeStore();
  const categoryStore = useCategoryStore();

  const navigate = useNavigate();

  const { pageNumber } = postStore;

  useEffect(() => {
    postStore.fetchPosts(pageNumber);
    commentStore.fetchComments();
    commentStore.fetchRecomments();
    userStore.fetchUsers();
    likeStore.fetchLike();
    categoryStore.fetchCategory();

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

  const { comments } = commentStore;
  const { recomments } = commentStore;

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
      likes={likeStore.likes}
      users={userStore.users}
      categories={categoryStore.categories}
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
