import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import LoginFormPage from './LoginFormPage';

const login = jest.fn();

const navigate = jest.fn();

const isLoginFail = false;
const loginErrorMessge = '아이디 혹은 비밀번호가 맞지 않습니다.';

const context = describe;

jest.mock('../hooks/useUserStore', () => () => ({
  isLoginFail,
  loginErrorMessge,
  login,
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('LoginFormPage', () => {
  beforeEach(() => {
    render(<LoginFormPage />);
  });

  it('render login title', () => {
    screen.getByText('USER LOGIN');
  });

  it('render login form', () => {
    screen.getByPlaceholderText('아이디');

    screen.getByPlaceholderText('비밀번호');

    screen.getByText('로그인하기');

    screen.getByText('회원가입');
  });

  context('when click login button', () => {
    it('sumbit login data', async () => {
      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'jel1y' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Qwe1234!' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      await waitFor(() => {
        expect(login).toBeCalled();
      });
    });
  });
});
