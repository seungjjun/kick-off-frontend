import { Route, Routes, useLocation } from 'react-router-dom';

import { useEffect } from 'react';

import { Reset } from 'styled-reset';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import EventSource from 'eventsource';

import { userApiService } from './services/UserApiService';

import GlobalStyle from './styles/GlobalStyle';

import useUserStore from './hooks/useUserStore';

import Header from './components/Header';

import BoardPage from './pages/BoardPage';
import LevelUpBoardPage from './pages/LevelUpBoardPage';
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

import useNotificationStore from './hooks/useNotificationStore';
import { notificationApiService } from './services/NotificationApiService';

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

const Body = styled.div`
  max-width: 1080px;
  min-width: 1072px;
  margin: 0 auto;
`;

const Menu = styled.div`
  display: inline-block;
  width: 180px;
  vertical-align: text-top;
  margin-top: 3em;
  margin-right: 2em;
`;

const Content = styled.div`
  display: inline-block;
  vertical-align: text-top;
  margin: 4em auto;
  width: 860px;
`;

export default function App() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const notificationStore = useNotificationStore();

  const userStore = useUserStore();

  const location = useLocation();

  const path = location.pathname;

  const { myInformation } = userStore;

  useEffect(() => {
    if (accessToken) {
      userApiService.setAccessToken(accessToken);
      notificationApiService.setAccessToken(accessToken);

      userStore.fetchMyInformation();
      notificationStore.checkNotification();

      const sseEvents = new EventSource('http://localhost:8000/connect', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      sseEvents.addEventListener('sse', (event) => {
        notificationStore.addNotification(JSON.parse(event.data));
        notificationStore.checkNotification();
      });
    }
  }, [accessToken]);

  return (
    <Container>
      <Reset />
      <GlobalStyle />
      <Header
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        user={userStore.myInformation}
      />
      <Body>
        {path === '/signup' || path === '/login' ? (
          null
        ) : (
          <Menu>
            <BoardListPage />
          </Menu>
        )}
        <Content>
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/levelup" element={<LevelUpBoardPage accessToken={accessToken} />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginFormPage />} />
            <Route path="/auth/kakao" element={<KaKaoLoginPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/write" element={<PostFormPage myInformation={myInformation} />} />
            <Route path="/posts/edit/:postId" element={<PostEditFormPage />} />
            <Route path="/schedule/:boardId" element={<SchedulePage accessToken={accessToken} />} />
            <Route path="/room/:roomId" element={<ChattingRoomPage myInformation={myInformation} />} />
          </Routes>
        </Content>
      </Body>
    </Container>
  );
}
