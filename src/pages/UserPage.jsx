import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import User from '../components/User';

import usePostStore from '../hooks/usePostStore';

import useUserStore from '../hooks/useUserStore';

export default function UserPage() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);

  const userStore = useUserStore();

  const postStore = usePostStore();

  const navigate = useNavigate();

  const formData = new FormData();

  const location = useLocation();

  const path = location.search;

  const userId = path.split('=')[1];

  useEffect(() => {
    userStore.fetchMyInformation(userId);
    userStore.setComponentState();

    // setName(userStore.myInformation.user.name);
  }, [location]);

  const nameChange = (name) => {
    setName(name);
  };

  const changeComponentState = (componentState) => {
    userStore.changeComponentState(componentState);
  };

  const changeEditState = () => {
    setIsUpdate(!isUpdate);
    userStore.setEditState();
  };

  const upload = async (e) => {
    const img = e.target.files[0];
    formData.append('multipartFile', img);

    await postStore.upload(formData);

    setImage(postStore.imageUrl);
  };

  const submit = async (data) => {
    await userStore.updateProfile(userId, data.name, image);

    setIsUpdate(!isUpdate);

    userStore.fetchMyInformation(userId);
    userStore.fetchUser();
  };

  const deleteCheckedPost = async (checkPosts) => {
    await postStore.deleteCheckedPost(checkPosts);

    await userStore.fetchMyInformation(userId);
  };

  const edits = {
    submit,
    upload,
    image,
    changeEditState,
    isUpdate,
    editState: userStore.editState,
    errorMessage: userStore.nicknameErrorMessage,
    name,
    nameChange,
  };

  return (
    <User
      myInformation={userStore.myInformation}
      changeComponentState={changeComponentState}
      componentState={userStore.componentState}
      navigate={navigate}
      deleteCheckedPost={deleteCheckedPost}
      edits={edits}
    />
  );
}
