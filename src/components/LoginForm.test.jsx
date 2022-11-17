import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import LoginForm from './LoginForm';

const submit = jest.fn();

const navigate = jest.fn();

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    const isLoginFail = false;

    const loginErrorMessge = '아이디 혹은 비밀번호가 맞지 않습니다.';

    render(<LoginForm
      submit={submit}
      navigate={navigate}
      isLoginFail={isLoginFail}
      loginErrorMessge={loginErrorMessge}
    />);
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
        expect(submit).toBeCalled();
      });
    });
  });

  context('when click signup button', () => {
    it('navigate signup page', () => {
      fireEvent.click(screen.getByText('회원가입'));

      expect(navigate).toBeCalledWith('/signup');
    });
  });
});
