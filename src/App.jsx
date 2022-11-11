import { Route, Routes } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { Reset } from 'styled-reset';

import GlobalStyle from './styles/GlobalStyle';

import useUserStore from './hooks/useUserStore';

import useScheduleStore from './hooks/useScheduleStore';

import Header from './components/Header';

import PostsPage from './pages/PostsPage';
import PostFormPage from './pages/PostFormPage';
import PostPage from './pages/PostPage';
import SchedulePage from './pages/SchedulePage';
import ChattingRoomPage from './pages/ChattingRoomPage';
import CategoryPostsPage from './pages/CategoryPostsPage';
import PostEditFormPage from './pages/PostEditFormPage';

export default function App() {
  // const [schedule, setSchedule] = useState(null);
  const [gameId, setGameId] = useState(0);
  const [loading, setLoading] = useState(false);

  const scheduleStore = useScheduleStore();

  const userStore = useUserStore();

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);

      await scheduleStore.fetchSchedule();
      userStore.fetchUser();

      setGameId(scheduleStore.gameId);

      setLoading(false);
    };

    fetchSchedule();
  }, []);

  const { user } = userStore;

  if (loading) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts" element={<CategoryPostsPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/write" element={<PostFormPage user={user} />} />
        <Route path="/posts/edit/:postId" element={<PostEditFormPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/room/:roomId" element={<ChattingRoomPage user={user} gameId={gameId} />} />
      </Routes>
    </div>
  );
}
