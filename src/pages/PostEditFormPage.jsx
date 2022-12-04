import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import usePostStore from '../hooks/usePostStore';

import useBoardStore from '../hooks/useBoardStore';

import PostEditForm from '../components/PostEditForm';

import Modal from '../components/Modal';

export default function PostEditFormPage() {
  const [close, setClose] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const postStore = usePostStore();

  const boardStore = useBoardStore();

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const postId = path.split('/')[3];

  const formData = new FormData();

  useEffect(() => {
    boardStore.fetchBoards();

    postStore.fetchPost(postId);
    setTitle(postStore.post.postInformation.title);
    setContent(postStore.post.postInformation.content);
    setImage(postStore.post.imageUrl);

    boardStore.reset();
  }, []);

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
    await postStore.patch(
      data.title,
      data.content,
      boardStore.boardId,
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
    <>
      <PostEditForm
        boardList={boardStore.boards}
        boardId={boardStore.boardId}
        navigate={navigate}
        submit={submit}
        changeBoard={changeBoard}
        upload={upload}
        image={image}
        title={title}
        content={content}
        titleChange={titleChange}
        contentChange={contentChange}
        setClose={setClose}
      />
      <Modal
        close={close}
        setClose={setClose}
      />
    </>
  );
}
