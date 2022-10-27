import { useEffect } from 'react';

import Posts from '../components/Posts';

import usePostStore from '../hooks/usePostStore';

export default function PostsPage() {
  const postStore = usePostStore();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const { posts } = postStore;

  return (
    <Posts posts={posts} />
  );
}
