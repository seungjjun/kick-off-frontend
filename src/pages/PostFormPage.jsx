import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import usePostStore from '../hooks/usePostStore';

import useBoardStore from '../hooks/useBoardStore';

import PostForm from '../components/PostForm';
import Modal from '../components/Modal';

export default function PostFormPage({ myInformation }) {
  const [image, setImage] = useState('');
  const [close, setClose] = useState(false);

  const postStore = usePostStore();

  const boardStore = useBoardStore();

  const navigate = useNavigate();

  const formData = new FormData();

  useEffect(() => {
    boardStore.fetchBoards();

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
    await postStore.write(
      data.title,
      data.content,
      boardStore.boardId,
      image,
      myInformation.user.id,
    );

    navigate(`/post/${postStore.postId}`);
  };

  const { boardId } = boardStore;

  return (
    <>
      <PostForm
        boardList={boardStore.boards}
        navigate={navigate}
        submit={submit}
        changeBoard={changeBoard}
        upload={upload}
        image={image}
        boardId={boardId}
        setClose={setClose}
      />
      <Modal
        close={close}
        setClose={setClose}
      />
    </>
  );
}
