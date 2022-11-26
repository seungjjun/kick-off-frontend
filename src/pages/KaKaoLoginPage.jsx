import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

import { userApiService } from '../services/UserApiService';

export default function KaKaoLoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  console.log('두번');
  const navigate = useNavigate();

  const userStore = useUserStore();

  const authorizationCode = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const ab = async () => {
      console.log('렌더링');

      const accessToken = await userStore.kakaoLogin(authorizationCode);

      setAccessToken(accessToken);
      userApiService.setAccessToken(accessToken);

      if (accessToken) {
        navigate('/');
      }
    };
    ab();
  }, []);

  return (
    <p>
      로그인중
    </p>
  );
}
