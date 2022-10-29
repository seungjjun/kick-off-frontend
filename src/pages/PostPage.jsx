import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Post from '../components/Post';

import usePostStore from '../hooks/usePostStore';

export default function PostPage() {
  const postStore = usePostStore();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const postId = path.split('/')[2];

    postStore.fetchPost(postId);
  }, []);

  const { post } = postStore;

  return (
    <Post
      post={post}
    />
  );
}
