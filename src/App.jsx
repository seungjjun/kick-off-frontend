import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';

import useUserStore from './hooks/useUserStore';

import Header from './components/Header';

import PostsPage from './pages/PostsPage';
import PostFormPage from './pages/PostFormPage';
import PostPage from './pages/PostPage';

export default function App() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  const { user } = userStore;

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/write" element={<PostFormPage user={user} />} />
      </Routes>
    </div>
  );
}
