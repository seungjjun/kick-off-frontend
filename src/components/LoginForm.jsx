/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

export default function LoginForm({
  submit, navigate, isLoginFail, loginErrorMessge,
}) {
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
    </div>
  );
}
