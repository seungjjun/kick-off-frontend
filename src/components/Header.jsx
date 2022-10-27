import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">KiCK OFF</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
