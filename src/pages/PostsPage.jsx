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
  const { comments } = postStore;
  const { likes } = postStore;
  const { users } = postStore;
  const { categories } = postStore;
  const { recomments } = postStore;

  const commentNumber = comments.map((comment) => comment.postId);
  const recommentNumber = recomments.map((recomment) => recomment.postId);

  return (
    <Posts
      posts={posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={likes}
      users={users}
      categories={categories}
      navigate={navigate}
    />
  );
}
