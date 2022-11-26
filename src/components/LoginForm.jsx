/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const KaKaoButton = styled.a`
overflow: hidden;
    width: 210px;
    border: none;
    background-color: transparent;
    margin-block: .5em;
    img {
        width: 200px;
        object-fit: cover;
    }
`;
export default function LoginForm({
  submit, navigate, isLoginFail, loginErrorMessge,
}) {
  // const REST_API_KEY = 'e5d7be850d09230a5729973d00efde1c';
  // const REDIRECT_URI = 'http://localhost:8080/auth/kakao';

  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    submit(data);
  };

  const handleClickRegister = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>USER LOGIN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">
          로그인하기
        </button>
        <button
          type="button"
          onClick={handleClickRegister}
        >
          회원가입
        </button>
      </form>
      <div>
        <KaKaoButton href="https://kauth.kakao.com/oauth/authorize?client_id=e5d7be850d09230a5729973d00efde1c&redirect_uri=http://localhost:8080/auth/kakao&response_type=code">
          <img src="https://user-images.githubusercontent.com/104840243/202971385-ee1b510d-e434-4da4-832a-2de9ebb622a7.png" alt="" />
        </KaKaoButton>
      </div>
    </div>
  );
}
