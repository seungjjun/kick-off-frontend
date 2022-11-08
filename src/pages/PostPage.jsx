import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Post from '../components/Post';

import usePostStore from '../hooks/usePostStore';

import useCommentStore from '../hooks/useCommentStore';

import useUserStore from '../hooks/useUserStore';

export default function PostPage() {
  const postStore = usePostStore();

  const commentStore = useCommentStore();

  const userStore = useUserStore();

  const location = useLocation();

  const path = location.pathname;
  const postId = path.split('/')[2];

  const myId = userStore.user.id;

  useEffect(() => {
    postStore.fetchPost(postId);
    postStore.fetchPosts();
    commentStore.fetchComment(postId);
    commentStore.setRecommentVisibleState();
    userStore.fetchUser();
  }, []);

  const countLike = () => {
    postStore.countLike(postId, myId);
  };

  const { post } = postStore;
  const { category } = postStore;
  const { likes } = postStore;
  const { user } = postStore;
  const { comments } = commentStore;
  const { recomments } = commentStore;

  const { users } = postStore;

  const { recommentVisibleState } = commentStore;

  const userName = userStore.user.name;

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
      post={post}
      category={category}
      likes={likes}
      comments={comments}
      recomments={recomments}
      user={user}
      countLike={countLike}
      users={users}
      submitComment={submitComment}
      recommentVisibleState={recommentVisibleState}
      changeRecommentFormState={changeRecommentFormState}
      submitRecomment={submitRecomment}
      userName={userName}
    />
  );
}
