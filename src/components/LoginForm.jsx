/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
`;

const Title = styled.h2`
  font-size: 1.6em;
  margin-bottom: 1.3em;
  font-weight: bold;
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

const LoginButton = styled.button`
  margin: 1.2em 0;
  padding: 0.7em 1em;
  color: #FFF;
`;

const SignUpButton = styled.button`
  border: none;
  background-color: #FFF;
  color: #000;
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
  const REDIRECT_URI = 'http://localhost:8080/auth/kakao';

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
      <Title>USER LOGIN</Title>
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
          <p>{errors.userId.message}</p>
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
          <p>{errors.password.message}</p>
        ) : isLoginFail ? (
          <p>{loginErrorMessge}</p>
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
