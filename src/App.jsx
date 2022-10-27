import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import PostsPage from './pages/PostsPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsPage />} />
      </Routes>
    </div>
  );
}
