import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { boardStore } from '../stores/BoardStore';

const HeaderBox = styled.div`
  width: 1080px;
  height: 150px;
  margin-top: 1.2em;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.li`
  a {
      font-size: 1.5em;
      color: #64C2EB;
  }
`;

const AfterLogin = styled.li`
  button {
    margin-right: 1em;
    border: none;
    background-color: #FFF;
  }
`;

const BeforeLogin = styled.div`
  font-size: 0.9em;
  display: flex;

  li {
    margin-left: 2em;
  }
  
`;

export default function Header({ accessToken, setAccessToken, user }) {
  const navigate = useNavigate();

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const handleClickMyPage = (name) => {
    navigate(`/users?nickname=${name}`);
  };

  if (accessToken && Object.keys(user).length === 0) {
    return (
      <p>로딩중입니다...</p>
    );
  }

  return (
    <HeaderBox>
      <nav>
        <List>
          <Title>
            <Link to="/">KiCK OFF</Link>
          </Title>
          {accessToken ? (
            <AfterLogin>
              <button
                type="button"
                onClick={handleClickLogout}
              >
                로그아웃
              </button>
              <button
                type="button"
                onClick={() => handleClickMyPage(user.user.name)}
              >
                내 정보
              </button>
              <span>{user.user.name}</span>
              <span>
                (
                {user.user.grade}
                )
              </span>
            </AfterLogin>
          ) : (
            <BeforeLogin>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </BeforeLogin>
          )}
        </List>
      </nav>
    </HeaderBox>
  );
}
