import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const HeaderBox = styled.div`
  display: flex;
  height: 80px;
  min-width: 1280px;
  background-color: #CD2C2C;
`;

const Content = styled.nav`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: auto;
  width: 100%;
`;

const List = styled.ul`
  display: flex;
  margin: auto;
  min-width: 1240px;
  justify-content: space-between;
`;

const Title = styled.div`
  background: url('https://user-images.githubusercontent.com/104769120/205762227-56c5f513-6003-4ca2-9741-6aa4fe9bf540.png');
  background-size: cover;
  width: 4em;
  height: 2.6em;
  cursor: pointer;
`;

const AfterLogin = styled.li`
  button:nth-child(4), button:nth-child(5) {
    margin-right: 1em;
    border: none; 
    border-radius: 1.6em;
    padding: .8em 2em;
    background-color: #fff;
    color: #000; 

    :hover {
    background-color: #000;
    color: #FFF;
    }
  }
`;

const Nickname = styled.span`
  color: #FFF;
`;

const Grade = styled.span`
  margin-right: 1.5em;
  color: #FFF;
`;

const MyPage = styled.button`
  margin-right: 2em;
  color: #FFF;
  background-color: #CD2C2C;
  cursor: pointer;

  :hover {
    background-color: #CD2C2C;
  }
`;

const BeforeLogin = styled.div`
  font-size: 0.9em;
  display: flex;

  li {
    margin-left: 2em;
    border-radius: 1.2em;
    width: 6em;
    height: 2.5em;
    background-color: #FFF;
    
    a {
      display: inline-block;
      padding: 0.8em;
      font-weight: bold;
    }
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

  const handleClickLogo = () => {
    navigate('/');
  };

  if (accessToken && Object.keys(user).length === 0) {
    return (
      <p>로딩중입니다...</p>
    );
  }

  return (
    <HeaderBox>
      <Content>
        <List>
          <Title onClick={handleClickLogo} />
          {accessToken ? (
            <AfterLogin>
              <Nickname>{user.user.name}</Nickname>
              <Grade>
                (
                {user.user.grade}
                )
              </Grade>
              <MyPage
                onClick={() => handleClickMyPage(user.user.name)}
              >
                내 정보
              </MyPage>
              <button
                type="button"
                onClick={handleClickLogout}
              >
                로그아웃
              </button>
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
      </Content>
    </HeaderBox>
  );
}
