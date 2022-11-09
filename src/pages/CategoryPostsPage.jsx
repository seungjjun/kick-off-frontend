import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import usePostStore from '../hooks/usePostStore';
import useCommentStore from '../hooks/useCommentStore';
import useUserStore from '../hooks/useUserStore';
import useLikeStore from '../hooks/useLikeStore';
import useCategoryStore from '../hooks/useCategoryStore';

import CategoryPosts from '../components/CategoryPosts';

export default function CategoryPostsPage() {
  const postStore = usePostStore();
  const commentStore = useCommentStore();
  const userStore = useUserStore();
  const likeStore = useLikeStore();
  const categoryStore = useCategoryStore();

  const location = useLocation();

  const path = location.search;

  const categoryId = path.split('=')[1];

  const navigate = useNavigate();

  useEffect(() => {
    postStore.fetchCategoryPosts(categoryId);
    commentStore.fetchComments();
    commentStore.fetchRecomments();
    userStore.fetchUsers();
    likeStore.fetchLike();
    categoryStore.fetchCategory();
  }, [location]);

  const { comments } = commentStore;
  const { recomments } = commentStore;

  const commentNumber = comments.map((comment) => comment.postId);
  const recommentNumber = recomments.map((recomment) => recomment.postId);

  return (
    <CategoryPosts
      posts={postStore.posts}
      commentNumber={commentNumber}
      recommentNumber={recommentNumber}
      likes={likeStore.likes}
      users={userStore.users}
      categories={categoryStore.categories}
      navigate={navigate}
      categoryId={categoryId}
    />
  );
}
