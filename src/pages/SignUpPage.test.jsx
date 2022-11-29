import { render, screen } from '@testing-library/react';

import SignupPage from './SignUpPage';

const navigate = jest.fn();

const register = jest.fn();

const isExistingUserId = false;

const errorMessage = '';

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/useUserStore', () => () => ({
  register,
  isExistingUserId,
  errorMessage,
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    render(<SignupPage />);
  });

  it('render signup page title', () => {
    screen.getByText('SIGN UP');
  });

  it('render signup page form', () => {
    screen.getByLabelText('닉네임');
    screen.getByLabelText('아이디');
    screen.getByLabelText('비밀번호');
    screen.getByLabelText('비밀번호 확인');

    screen.getByText('회원가입');
  });
});
