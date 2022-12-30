/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 6em;
  height: 700px;
`;

const Title = styled.div`
  margin-bottom: 2em;
  width: 9em;
  height: 5.7em;
  background: url("https://user-images.githubusercontent.com/104769120/206422757-c138bb7f-6f62-45e3-8f14-042ec9da5efd.png");
  background-size: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;

  input {
    padding: 0.5em 1.2em;
    border-radius: 5px;
    border: 1px solid #CCC;
  }
`;

const Error = styled.p`
  margin: 0.8em 0 0.4em 0;
  color: #FF424D;
`;

const LoginButton = styled.button`
  margin: .6em 0;
  padding: 0.7em 1em;
  color: #FFF;
`;

const SignUpButton = styled.button`
  border: none;
  padding: 0.7em 1em;
  background-color: #FFF;
  color: #000;

  :hover {
    background-color: #CD2C2C;
    color: #FFF;
}
`;

const SNS = styled.div`
  margin-top: 1.4em;
`;

const SNSlogin = styled.p`
  font-size: 0.75em;
  text-align: center;
  margin-bottom: 1em;
  color: #797979;
`;

const KaKaoButton = styled.a`
  img {
      width: 200px;
      object-fit: cover;
  }
`;

export default function LoginForm({
  submit, navigate, isLoginFail, loginErrorMessge,
}) {
  const REST_API_KEY = 'e5d7be850d09230a5729973d00efde1c';
  const REDIRECT_URI = 'https://https://seungjjun.github.io/kick-off-frontend/auth/kakao';

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    submit(data);
  };

  const handleClickRegister = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Title />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="input-userId"
          type="text"
          placeholder="아이디"
          error={errors.userId}
          {...register('userId', {
            required: { value: true, message: '아이디를 입력해주세요' },
          })}
        />
        {errors.userId ? (
          <Error>{errors.userId.message}</Error>
        ) : null}
        <input
          id="input-password"
          type="password"
          placeholder="비밀번호"
          error={errors.password}
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
          })}
        />
        {errors.password ? (
          <Error>{errors.password.message}</Error>
        ) : isLoginFail ? (
          <Error>{loginErrorMessge}</Error>
        ) : null}
        <LoginButton type="submit">
          로그인
        </LoginButton>
        <SignUpButton
          type="button"
          onClick={handleClickRegister}
        >
          회원가입
        </SignUpButton>
      </Form>
      <SNS>
        <SNSlogin>SNS계정으로 간편 로그인/회원가입</SNSlogin>
        <KaKaoButton href={KAKAO_AUTH_URL}>
          <img src="https://user-images.githubusercontent.com/104840243/202971385-ee1b510d-e434-4da4-832a-2de9ebb622a7.png" alt="" />
        </KaKaoButton>
      </SNS>
    </Container>
  );
}
