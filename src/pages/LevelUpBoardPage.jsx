import { useEffect } from 'react';

import LevelUpBoard from '../components/LevelUpBoard';

import useGradeStore from '../hooks/useGradeStore';

import useUserStore from '../hooks/useUserStore';

export default function LevelUpBoardPage() {
  const userStore = useUserStore();

  const gradeStore = useGradeStore();

  useEffect(() => {
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
