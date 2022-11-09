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

  useEffect(() => {
    postStore.fetchPost(postId);
    postStore.fetchPosts();
    commentStore.fetchComment(postId);
    commentStore.fetchRecomment(postId);
    commentStore.setRecommentVisibleState();
    userStore.fetchUser();
    likeStore.fetchLike();
  }, []);

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
    />
  );
}
