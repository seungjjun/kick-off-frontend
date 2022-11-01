import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Post from '../components/Post';

import usePostStore from '../hooks/usePostStore';
import { userStore } from '../stores/UserStore';

export default function PostPage() {
  const postStore = usePostStore();

  const location = useLocation();

  const path = location.pathname;
  const postId = path.split('/')[2];

  const { user } = userStore;

  useEffect(() => {
    postStore.fetchPost(postId);
  }, []);

  const countLike = () => {
    postStore.countLike(postId, user.id);
  };

  const { post } = postStore;
  const { category } = postStore;
  const { author } = postStore;
  const { likes } = postStore;

  return (
    <Post
      post={post}
      category={category}
      author={author}
      likes={likes}
      countLike={countLike}
    />
  );
}
