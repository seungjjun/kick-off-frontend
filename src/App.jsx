import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import PostsPage from './pages/PostsPage';
import PostFormPage from './pages/PostFormPage';
import PostPage from './pages/PostPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/write" element={<PostFormPage />} />
      </Routes>
    </div>
  );
}
