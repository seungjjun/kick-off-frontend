import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Posts from '../components/Posts';

import usePostStore from '../hooks/usePostStore';

export default function PostsPage() {
  const postStore = usePostStore();

  const navigate = useNavigate();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts } = postStore;

  return (
    <Posts
      posts={posts}
      navigate={navigate}
    />
  );
}
