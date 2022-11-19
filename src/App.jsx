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

import LoginFormPage from './pages/LoginFormPage';
import PostFormPage from './pages/PostFormPage';
import PostPage from './pages/PostPage';
import SchedulePage from './pages/SchedulePage';
import ChattingRoomPage from './pages/ChattingRoomPage';
import PostEditFormPage from './pages/PostEditFormPage';
import BoardPage from './pages/BoardPage';
import BoardListPage from './pages/BoardListPage';

const Container = styled.div`
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

      await scheduleStore.fetchSchedule();

      if (accessToken) {
        userApiService.setAccessToken(accessToken);

        userStore.fetchUser();
      }

      setGameId(scheduleStore.gameId);

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
      <Header accessToken={accessToken} setAccessToken={setAccessToken} />
      <Menu>
        <BoardListPage />
      </Menu>
      <Content>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/write" element={<PostFormPage user={user} />} />
          <Route path="/posts/edit/:postId" element={<PostEditFormPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/room/:roomId" element={<ChattingRoomPage user={user} gameId={gameId} />} />
        </Routes>
      </Content>
    </Container>
  );
}
