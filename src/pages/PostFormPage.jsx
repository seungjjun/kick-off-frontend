import { useNavigate } from 'react-router-dom';

import usePostStore from '../hooks/usePostStore';

import PostForm from '../components/PostForm';

export default function PostFormPage() {
  const postStore = usePostStore();

  const navigate = useNavigate();

  const changeCategory = (value) => {
    postStore.changeCategory(value);
  };

  const submit = async (data) => {
    postStore.write(data.title, data.content, postStore.category);
    postStore.fetchPosts();
    navigate('/');
  };

  return (
    <PostForm
      postStore={postStore}
      navigate={navigate}
      submit={submit}
      changeCategory={changeCategory}
    />
  );
}
