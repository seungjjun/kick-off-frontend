/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: auto;
  width: 60%;
  flex-direction: column;
  margin-right: 6em;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.4em;
  margin-bottom: 1.2em;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.1em;
    text-align: start;
    margin-bottom: 0.5em;
    color: #CCC;
  }

  input {
    padding: 1em 1em;
    margin-bottom: 1.2em;
  }
`;

const Error = styled.p`
  text-align: start;
  margin-bottom: 1.2em;
  color: red;
`;

const RegisterButton = styled.button`
  margin-top: 1em;
  padding: 1em 0;
  color: #FFF;
`;

export default function SignUp({ submit, errorMessage, isExistingUserId }) {
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    submit(data);
  };

  return (
    <Container>
      <Title>SIGN UP</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="input-name">닉네임</label>
        <input
          id="input-name"
          type="text"
          placeholder="닉네임 (2 ~ 10자)"
          errors={errors.name}
          {...register('name', {
            required: { value: true, message: '닉네임을 입력해주세요.' },
            pattern: { value: /^[가-힣a-z0-9]{2,10}$/, message: '닉네임을 다시 확인해주세요' },
          })}
        />
        {errors.name ? (
          <Error>{errors.name.message}</Error>
        ) : (
          null
        )}
        <label htmlFor="input-identification">아이디</label>
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
          <Error>{errors.identification.message}</Error>
        ) : null}
        <label
          htmlFor="input-password"
        >
          비밀번호
        </label>
        <input
          id="input-password"
          type="password"
          placeholder="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다."
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
          <Error>{errors.password.message}</Error>
        ) : (
          null
        )}
        <label
          htmlFor="input-confirmPassword"
        >
          비밀번호 확인
        </label>
        <input
          id="input-confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.confirmPassword}
          {...register('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
        />
        {errors.confirmPassword ? (
          <Error>비밀번호가 일치하지 않습니다</Error>
        ) : isExistingUserId ? (
          <Error>{errorMessage}</Error>
        ) : null}
        <RegisterButton
          id="signup"
          type="submit"
        >
          회원가입
        </RegisterButton>
      </Form>
    </Container>
  );
}
