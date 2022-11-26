import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import SignUp from './SingnUp';

const submit = jest.fn();

const context = describe;

describe('SingnUp', () => {
  beforeEach(() => {
    const errorMessage = '';

    const isExistingUserId = false;

    render(<SignUp
      submit={submit}
      errorMessage={errorMessage}
      isExistingUserId={isExistingUserId}
    />);
  });

  context('when sign up', () => {
    it('render sign up form', () => {
      screen.getByLabelText('닉네임 :');
      screen.getByLabelText('아이디 :');
      screen.getByLabelText('비밀번호 :');
      screen.getByLabelText('비밀번호 확인 :');

      screen.getByText('회원가입');
    });

    it('submit called', async () => {
      fireEvent.change(screen.getByLabelText('닉네임 :'), {
        target: { value: '노승준' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'jel1y' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: 'Qwe1234!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: 'Qwe1234!' },
      });

      fireEvent.submit(screen.getByText('회원가입'));

      await waitFor(() => {
        expect(submit).toBeCalled();
      });
    });
  });
});
