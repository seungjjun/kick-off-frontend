import { Route, Routes } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { Reset } from 'styled-reset';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import { userApiService } from './services/UserApiService';

import GlobalStyle from './styles/GlobalStyle';

import useUserStore from './hooks/useUserStore';

import useScheduleStore from './hooks/useScheduleStore';

import Header from './components/Header';

import BoardPage from './pages/BoardPage';
import UserPage from './pages/UserPage';
import LoginFormPage from './pages/LoginFormPage';
import PostPage from './pages/PostPage';
import PostFormPage from './pages/PostFormPage';
import SchedulePage from './pages/SchedulePage';
import ChattingRoomPage from './pages/ChattingRoomPage';
import PostEditFormPage from './pages/PostEditFormPage';
import BoardListPage from './pages/BoardListPage';
import SignupPage from './pages/SignUpPage';
import KaKaoLoginPage from './pages/KaKaoLoginPage';

const Container = styled.div`
  min-width: 1072px;
  max-width: 1080px;
  min-height: 100vh;
  margin: 0 auto;
`;

const Menu = styled.div`
  display: inline-block;
  width: 180px;
  vertical-align: text-top;
  border-top: 1px solid #CCC;
  margin-right: 2em;
`;

const Content = styled.div`
  display: inline-block;
  vertical-align: text-top;
  margin: 0 auto;
  width: 860px;
`;

export default function App() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const [gameId, setGameId] = useState(0);
  const [loading, setLoading] = useState(false);

  const scheduleStore = useScheduleStore();

  const userStore = useUserStore();

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);

      if (accessToken) {
        userApiService.setAccessToken(accessToken);

        userStore.fetchUser();
      }

      await setGameId(scheduleStore.roomId);

      setLoading(false);
    };

    fetchSchedule();
  }, [accessToken]);

  const { user } = userStore;

  if (loading) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <Container>
      <Reset />
      <GlobalStyle />
      <Header
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        user={userStore.user}
      />
      <Menu>
        <BoardListPage />
      </Menu>
      <Content>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/auth/kakao" element={<KaKaoLoginPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/write" element={<PostFormPage user={user} />} />
          <Route path="/posts/edit/:postId" element={<PostEditFormPage />} />
          <Route path="/schedule" element={<SchedulePage accessToken={accessToken} />} />
          <Route path="/room/:roomId" element={<ChattingRoomPage user={user} gameId={gameId} />} />
        </Routes>
      </Content>
    </Container>
  );
}
