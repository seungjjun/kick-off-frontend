import { render, screen } from '@testing-library/react';
import Header from './Header';

const navigate = jest.fn();
const setAccessToken = jest.fn();

const context = describe;

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },

  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('Header', () => {
  context('when have a accesstoken', () => {
    beforeEach(() => {
      const user = {
        id: 1,
        name: '황인범',
      };

      const accessToken = 'ACCESS.TOKEN';
      render((
        <Header
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          user={user}
        />
      ));
    });

    it('render logout button', () => {
      screen.getByText('로그아웃');
    });

    it('render my page button', () => {
      screen.getByText('내 정보');
    });

    it('render user name', () => {
      screen.getByText('황인범');
    });
  });

  context('when not have a accesstoken', () => {
    beforeEach(() => {
      const user = {
        id: 1,
        name: '황인범',
      };

      const accessToken = '';
      render((
        <Header
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          user={user}
        />
      ));
    });

    it('render login button', () => {
      screen.getByText('로그인');
    });

    it('render register button', () => {
      screen.getByText('회원가입');
    });
  });
});
