import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import usePostStore from '../hooks/usePostStore';

import useBoardStore from '../hooks/useBoardStore';

import PostForm from '../components/PostForm';

export default function PostFormPage({ user }) {
  const [image, setImage] = useState('');

  const postStore = usePostStore();

  const boardStore = useBoardStore();

  const navigate = useNavigate();

  const formData = new FormData();

  const changeBoard = (value) => {
    boardStore.changeBoard(value);
  };

  const upload = async (e) => {
    const img = e.target.files[0];
    formData.append('multipartFile', img);

    await postStore.upload(formData);

    setImage(postStore.imageUrl);
  };

  const submit = async (data) => {
    await postStore.write(
      data.title,
      data.content,
      boardStore.boardId,
      image,
      user.id,
    );

    navigate(`/post/${postStore.postId}`);
  };

  return (
    <PostForm
      navigate={navigate}
      submit={submit}
      changeBoard={changeBoard}
      upload={upload}
      image={image}
    />
  );
}
