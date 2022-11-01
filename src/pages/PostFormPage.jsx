import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import usePostStore from '../hooks/usePostStore';

import PostForm from '../components/PostForm';

export default function PostFormPage({ user }) {
  const [image, setImage] = useState('');

  const postStore = usePostStore();

  const navigate = useNavigate();

  const formData = new FormData();

  const changeCategory = (value) => {
    postStore.changeCategory(value);
  };

  const upload = async (e) => {
    const img = e.target.files[0];
    formData.append('multipartFile', img);

    await postStore.upload(formData);

    setImage(postStore.imageUrl);
  };

  const submit = async (data) => {
    await postStore.write(data.title, data.content, postStore.categoryId, image, user.id);
    postStore.fetchPosts();
    navigate(`/post/${postStore.postId}`);
  };

  return (
    <PostForm
      postStore={postStore}
      navigate={navigate}
      submit={submit}
      changeCategory={changeCategory}
      upload={upload}
      image={image}
    />
  );
}
