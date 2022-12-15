import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import Post from '../components/Post';

import usePostStore from '../hooks/usePostStore';

import useCommentStore from '../hooks/useCommentStore';

import useUserStore from '../hooks/useUserStore';

import useLikeStore from '../hooks/useLikeStore';
import useBoardStore from '../hooks/useBoardStore';

export default function PostPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const boardStore = useBoardStore();
  const postStore = usePostStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();
  const likeStore = useLikeStore();

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const postId = path.split('/')[2];

  const myId = userStore.user.id;

  const { commentPageNumber } = commentStore;

  const countLike = () => {
    likeStore.countLike(postId, myId);
  };

  const modifyPost = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  const deletePost = async (postId) => {
    postStore.deletePost(postId);

    await boardStore.fetchPosts();

    navigate('/');
  };

  const changeRecommentFormState = (commentId) => {
    commentStore.changeRecommentVisibleState(commentId);
  };

  const submitComment = async (data, receiverId) => {
    await commentStore.createComment(
      data.content,
      postId,
      myId,
      receiverId,
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

  const changeCommentEditState = (commentId) => {
    commentStore.changeCommentEditState(commentId);
  };

  const modifyComment = async (content, commentId) => {
    await commentStore.modifyComment(content, commentId);

    commentStore.fetchComment(postId, commentPageNumber);
  };

  const deleteComment = async (commentId) => {
    await commentStore.deleteComment(commentId);

    commentStore.fetchComment(postId, commentPageNumber);
  };

  const changeRecommentEditState = (recommentId) => {
    commentStore.changeRecommentEditState(recommentId);
  };

  const modifyRecomment = async (content, recommentId) => {
    await commentStore.modifyRecomment(content, recommentId);

    commentStore.fetchRecomment(postId);
  };

  const deleteRecomment = async (recommentId) => {
    await commentStore.deleteRecomment(recommentId);

    commentStore.fetchComment(postId, commentPageNumber);
    commentStore.fetchRecomment(postId);
  };

  useEffect(() => {
    postStore.fetchPost(postId);
    commentStore.fetchComment(postId, commentPageNumber);
    commentStore.fetchRecomment(postId);
    commentStore.setRecommentVisibleState();
    userStore.fetchUsers();
    likeStore.fetchLike();
  }, [commentPageNumber]);

  const { startPage } = commentStore.page;
  const { lastPage } = commentStore.page;
  const { currentLastPage } = commentStore.page;

  const isPreviousPage = startPage > 1;
  const isNextPage = lastPage < currentLastPage;

  const posts = {
    post: postStore.post,
    board: postStore.board,
    likes: likeStore.likes,
    comments: commentStore.comments,
    recomments: commentStore.recomments,
    user: postStore.user,
    users: userStore.users,
    loginUser: userStore.user,
    userName: userStore.user.name,
  };

  const pages = {
    pageButtons: commentStore.pageButton,
    isPreviousPage,
    isNextPage,
    nextPage,
    previousPage,
    changeCommentNumber,
  };

  const comments = {
    submitComment,
    commentEditState: commentStore.commentEditState,
    modifyComment,
    deleteComment,
    changeCommentEditState,
    recommentVisibleState: commentStore.recommentVisibleState,
  };

  const recomments = {
    submitRecomment,
    changeRecommentFormState,
    recommentEditState: commentStore.recommentEditState,
    changeRecommentEditState,
    deleteRecomment,
    modifyRecomment,
  };

  return (
    <Post
      posts={posts}
      pages={pages}
      comments={comments}
      recomments={recomments}
      countLike={countLike}
      modifyPost={modifyPost}
      deletePost={deletePost}
      accessToken={accessToken}
      navigate={navigate}
    />
  );
}
