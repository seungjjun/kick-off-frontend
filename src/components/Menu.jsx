import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">전체 게시판</Link>
          </li>
          <li>
            <Link to="/posts?category=2">EPL</Link>
          </li>
          <li>
            <Link to="/posts?category=3">LaLiga</Link>
          </li>
          <li>
            <Link to="/posts?category=4">SerieA</Link>
          </li>
          <li>
            <Link to="/posts?category=5">Bundesliga</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
