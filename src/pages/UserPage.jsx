import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import User from '../components/User';

import usePostStore from '../hooks/usePostStore';

import useUserStore from '../hooks/useUserStore';

export default function UserPage() {
  const userStore = useUserStore();

  const postStore = usePostStore();

  const navigate = useNavigate();

  const location = useLocation();

  const path = location.search;

  const userId = path.split('=')[1];

  const deletePost = async (postId) => {
    postStore.deletePost(postId);

    userStore.fetchMyInformation(userId);
  };

  useEffect(() => {
    userStore.fetchMyInformation(userId);
    userStore.setComponentState();
  }, [path]);

  const changeComponentState = (componentState) => {
    userStore.changeComponentState(componentState);
  };

  return (
    <User
      myInformation={userStore.myInformation}
      changeComponentState={changeComponentState}
      componentState={userStore.componentState}
      navigate={navigate}
      deletePost={deletePost}
    />
  );
}
