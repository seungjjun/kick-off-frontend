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

  useEffect(() => {
    postStore.fetchPosts();
    commentStore.fetchComments();
    commentStore.fetchRecomments();
    userStore.fetchUsers();
    likeStore.fetchLike();
    categoryStore.fetchCategory();
  }, []);

  const { comments } = commentStore;
  const { recomments } = commentStore;

  const commentNumber = comments.map((comment) => comment.postId);
  const recommentNumber = recomments.map((recomment) => recomment.postId);

  return (
    <Posts
      posts={postStore.posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={likeStore.likes}
      users={userStore.users}
      categories={categoryStore.categories}
      navigate={navigate}
    />
  );
}
