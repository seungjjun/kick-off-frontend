import { useState } from 'react';

import { Link } from 'react-router-dom';

import Menu from './Menu';

export default function Header() {
  const [isShow, setIsShow] = useState(false);

  const handleClickMenu = () => {
    setIsShow(!isShow);
  };

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
          <li>
            <button
              type="button"
              onClick={handleClickMenu}
            >
              Menu
            </button>
            {isShow ? (
              <Menu />
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
}
