import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import LevelUpBoard from '../components/LevelUpBoard';

import useGradeStore from '../hooks/useGradeStore';

import useUserStore from '../hooks/useUserStore';

export default function LevelUpBoardPage({ accessToken }) {
  const userStore = useUserStore();

  const gradeStore = useGradeStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }

    userStore.fetchMyInformation();
  }, []);

  const changeGrade = (value) => {
    gradeStore.changeGrade(value);
  };

  const submit = async (data) => {
    await gradeStore.apply(data.reason, userStore.myInformation.user.id);
  };

  return (
    <LevelUpBoard
      submit={submit}
      changeGrade={changeGrade}
      isExistingUser={gradeStore.isExistingUser}
      applicationErrorMessge={gradeStore.applicationErrorMessge}
    />
  );
}
