import { Link } from 'react-router-dom';

import { postStore } from '../stores/PostStore';

export default function Menu() {
  const handleClickTotalBoard = () => {
    postStore.changePageNumber(0);
  };

  const handleClickCategory = () => {
    postStore.pageNumber = 0;
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={handleClickTotalBoard}>전체 게시판</Link>
          </li>
          <li>
            <Link to="/posts?category=2" onClick={handleClickCategory}>EPL</Link>
          </li>
          <li>
            <Link to="/posts?category=3" onClick={handleClickCategory}>LaLiga</Link>
          </li>
          <li>
            <Link to="/posts?category=4" onClick={handleClickCategory}>SerieA</Link>
          </li>
          <li>
            <Link to="/posts?category=5" onClick={handleClickCategory}>Bundesliga</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
