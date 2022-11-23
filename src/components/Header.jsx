import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

// import Menu from './Category';

const HeaderBox = styled.div`
  width: 1080px;
  height: 150px;
`;

export default function Header({ accessToken, setAccessToken, user }) {
  const navigate = useNavigate();

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const handleClickMyPage = (userId) => {
    navigate(`/users?id=${userId}`);
  };

  return (
    <HeaderBox>
      <nav>
        <ul>
          <li>
            <Link to="/">KiCK OFF</Link>
          </li>
          {accessToken ? (
            <li>
              <button
                type="button"
                onClick={handleClickLogout}
              >
                로그아웃
              </button>
              <button
                type="button"
                onClick={() => handleClickMyPage(user.id)}
              >
                내 정보
              </button>
              <span>{user.name}</span>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          )}
          <li>
            {/* <button
              type="button"
              onClick={handleClickMenu}
            >
              Menu
            </button>
            {isShow ? (
              <Menu />
            ) : null} */}
          </li>
        </ul>
      </nav>
    </HeaderBox>
  );
}
