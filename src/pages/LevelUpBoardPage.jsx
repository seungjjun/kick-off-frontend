import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LevelUpBoard from '../components/LevelUpBoard';

import useGradeStore from '../hooks/useGradeStore';

import useUserStore from '../hooks/useUserStore';

import usePostStore from '../hooks/usePostStore';

export default function LevelUpBoardPage({ accessToken }) {
  const userStore = useUserStore();

  const postStore = usePostStore();

  const gradeStore = useGradeStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }

    userStore.fetchMyInformation();

    postStore.fetchApplicationPosts(accessToken);
  }, []);

  const changeGrade = (value) => {
    gradeStore.changeGrade(value);
  };

  const submit = async (data) => {
    await gradeStore.apply(data.reason, userStore.myInformation.user.id);
  };

  const { applicationPosts } = postStore;

  return (
    <LevelUpBoard
      submit={submit}
      changeGrade={changeGrade}
      isExistingUser={gradeStore.isExistingUser}
      applicationErrorMessge={gradeStore.applicationErrorMessge}
      applicationPosts={applicationPosts}
    />
  );
}
