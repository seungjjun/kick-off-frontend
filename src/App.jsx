import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import PostsPage from './pages/PostsPage';
import PostFormPage from './pages/PostFormPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/write" element={<PostFormPage />} />
      </Routes>
    </div>
  );
}
