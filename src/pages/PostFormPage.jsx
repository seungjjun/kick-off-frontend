import { useNavigate } from 'react-router-dom';

import usePostStore from '../hooks/usePostStore';

import PostForm from '../components/PostForm';

export default function PostFormPage() {
  const postStore = usePostStore();

  const navigate = useNavigate();

  const submit = async (data) => {
    postStore.write(data, postStore.category);
  };

  return (
    <PostForm
      postStore={postStore}
      navigate={navigate}
      submit={submit}
    />
  );
}
