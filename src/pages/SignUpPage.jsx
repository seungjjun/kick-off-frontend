import { useNavigate } from 'react-router-dom';

import SignUp from '../components/SignUp';

import useUserStore from '../hooks/useUserStore';

export default function SignupPage() {
  const userStore = useUserStore();

  const navigate = useNavigate();

  const submit = async (data) => {
    const {
      name, identification, password, confirmPassword,
    } = data;

    await userStore.register({
      name, identification, password, confirmPassword,
    });

    if (userStore.isExistingUserId) {
      return;
    }

    navigate('/login');
  };

  return (
    <SignUp
      submit={submit}
      errorMessage={userStore.errorMessage}
      isExistingUserId={userStore.isExistingUserId}
    />
  );
}
