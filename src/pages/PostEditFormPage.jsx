import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import usePostStore from '../hooks/usePostStore';

import PostEditForm from '../components/PostEditForm';

export default function PostEditFormPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const postStore = usePostStore();

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const postId = path.split('/')[3];

  const formData = new FormData();

  useEffect(() => {
    postStore.fetchPost(postId);
    setTitle(postStore.post.postInformation.title);
    setContent(postStore.post.postInformation.content);
    setImage(postStore.post.imageUrl);
  }, []);

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
    await postStore.patch(
      data.title,
      data.content,
      postStore.categoryId,
      image,
      postId,
    );

    postStore.fetchPost(postId);
    navigate(`/post/${postId}`);
  };

  const titleChange = (value) => {
    setTitle(value);
  };

  const contentChange = (value) => {
    setContent(value);
  };

  return (
    <PostEditForm
      category={postStore.category}
      navigate={navigate}
      submit={submit}
      changeCategory={changeCategory}
      upload={upload}
      image={image}
      title={title}
      content={content}
      titleChange={titleChange}
      contentChange={contentChange}
    />
  );
}
