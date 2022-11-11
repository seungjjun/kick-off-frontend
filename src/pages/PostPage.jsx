import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Post from '../components/Post';

import usePostStore from '../hooks/usePostStore';

import useCommentStore from '../hooks/useCommentStore';

import useUserStore from '../hooks/useUserStore';

import useLikeStore from '../hooks/useLikeStore';

export default function PostPage() {
  const postStore = usePostStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();
  const likeStore = useLikeStore();

  const location = useLocation();

  const path = location.pathname;
  const postId = path.split('/')[2];

  const myId = userStore.user.id;

  const { commentPageNumber } = commentStore;

  useEffect(() => {
    postStore.fetchPost(postId);
    // postStore.fetchPosts();
    commentStore.fetchComment(postId, commentPageNumber);
    commentStore.fetchRecomment(postId);
    commentStore.setRecommentVisibleState();
    userStore.fetchUser();
    likeStore.fetchLike();
  }, [commentPageNumber]);

  const countLike = () => {
    likeStore.countLike(postId, myId);
  };

  const { category } = postStore;

  const { recommentVisibleState } = commentStore;

  const changeRecommentFormState = (commentId) => {
    commentStore.changeRecommentVisibleState(commentId);
  };

  const submitComment = async (data) => {
    await commentStore.createComment(
      data.content,
      postId,
      myId,
    );
  };

  const submitRecomment = async (data, commentId) => {
    await commentStore.createRecomment(
      data.content,
      commentId,
      postId,
      myId,
    );
  };

  const changeCommentNumber = (commentNumber) => {
    commentStore.changeCommentNumber(commentNumber);
  };

  const nextPage = () => {
    commentStore.nextPage();
  };

  const previousPage = () => {
    commentStore.previousPage();
  };

  const { startPage } = commentStore.page;
  const { lastPage } = commentStore.page;
  const { currentLastPage } = commentStore.page;

  const isPreviousPage = startPage > 1;
  const isNextPage = lastPage < currentLastPage;

  return (
    <Post
      post={postStore.post}
      category={category}
      likes={likeStore.likes}
      comments={commentStore.comments}
      recomments={commentStore.recomments}
      user={userStore.user}
      countLike={countLike}
      users={userStore.users}
      submitComment={submitComment}
      recommentVisibleState={recommentVisibleState}
      changeRecommentFormState={changeRecommentFormState}
      submitRecomment={submitRecomment}
      userName={userStore.user.name}
      changeCommentNumber={changeCommentNumber}
      isPreviousPage={isPreviousPage}
      isNextPage={isNextPage}
      nextPage={nextPage}
      previousPage={previousPage}
      pageButtons={commentStore.pageButton}
    />
  );
}
