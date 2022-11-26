/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

export default function SignUp({ submit, errorMessage, isExistingUserId }) {
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    submit(data);
  };

  return (
    <div>
      <h2>signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="input-name">닉네임 :</label>
        <input
          id="input-name"
          type="text"
          errors={errors.name}
          {...register('name', {
            required: { value: true, message: '닉네임을 입력해주세요.' },
            pattern: { value: /^[가-힣a-z0-9]{2,10}$/, message: '닉네임을 다시 확인해주세요' },
          })}
        />
        {errors.name ? (
          <p>{errors.name.message}</p>
        ) : (
          null
        )}
        <label htmlFor="input-identification">아이디 :</label>
        <input
          id="input-identification"
          type="text"
          placeholder="아이디는 4 ~ 16자의 영문 소문자와 숫자로만 입력해주세요."
          errors={errors.identification}
          {...register('identification', {
            required: { value: true, message: '아이디를 입력해주세요.' },
            pattern: { value: /^[a-z0-9]{4,16}$/, message: '아이디를 다시 확인해주세요' },
          })}
        />
        {errors.identification ? (
          <p>{errors.identification.message}</p>
        ) : isExistingUserId ? (
          <p>{errorMessage}</p>
        ) : null}
        <label
          htmlFor="input-password"
        >
          비밀번호 :
        </label>
        <input
          id="input-password"
          type="password"
          error={errors.password}
          {...register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
              message: '비밀번호를 다시 확인해주세요',
            },
          })}
        />
        {errors.password ? (
          <p>{errors.password.message}</p>
        ) : (
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다.</p>
        )}
        <label
          htmlFor="input-confirmPassword"
        >
          비밀번호 확인 :
        </label>
        <input
          id="input-confirmPassword"
          type="password"
          error={errors.confirmPassword}
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
        />
        {errors.confirmPassword ? (
          <p>비밀번호가 일치하지 않습니다</p>
        ) : null}
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
