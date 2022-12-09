import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import LoginForm from '../components/LoginForm';

import useUserStore from '../hooks/useUserStore';

import { userApiService } from '../services/UserApiService';

export default function LoginFormPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  const userStore = useUserStore();

  const { isLoginFail } = userStore;
  const { loginErrorMessge } = userStore;

  const submit = async (data) => {
    const { userId, password } = data;

    const accessToken = await userStore.login({ userId, password });

    if (accessToken) {
      setAccessToken(accessToken);
      userApiService.setAccessToken(accessToken);

      navigate('/');
    }
  };

  return (
    <LoginForm
      submit={submit}
      navigate={navigate}
      isLoginFail={isLoginFail}
      loginErrorMessge={loginErrorMessge}
    />
  );
}
