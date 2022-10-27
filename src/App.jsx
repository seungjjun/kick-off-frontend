import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import Posts from './components/Posts';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
      </Routes>
    </div>
  );
}
