import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

import { userApiService } from '../services/UserApiService';

export default function KaKaoLoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const userStore = useUserStore();

  const authorizationCode = new URL(window.location.href).searchParams.get('code');

  const kakaoAccessToken = async () => {
    const accessToken = await userStore.kakaoLogin(authorizationCode);

    setAccessToken(accessToken);

    userApiService.setAccessToken(accessToken);

    if (accessToken) {
      navigate('/');
    }
  };

  useEffect(() => {
    kakaoAccessToken();
  }, []);

  return (
    <p>
      로그인중
    </p>
  );
}
