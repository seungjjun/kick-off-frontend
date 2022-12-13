import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  margin-top: 1em;

  button {
    color: #979797;
    background-color: #FFF;
  }
`;

const ButtonBox = styled.div`
  align-self: flex-end;
  margin-left: .3em;

  button {
    margin-left: 1em;
  }
`;

const RecoomentContent = styled.div`
  
  p {
    margin-bottom: .6em;
  }

  input {
    padding: .4em .6em;
    border: 1px solid #CCC;
  }
`;

export default function RecommentForm({
  changeRecommentFormState, submitRecomment, commentId, userName,
}) {
  const { register, handleSubmit } = useForm();

  const createRecomment = (data) => {
    submitRecomment(data, commentId);

    changeRecommentFormState();
  };

  const handleClickCancel = () => {
    changeRecommentFormState();
  };

  return (
    <Form onSubmit={handleSubmit(createRecomment)}>
      <RecoomentContent>
        <p>{userName}</p>
        <input
          id="input-content"
          type="text"
          placeholder="댓글을 입력하세요"
          {...register('content')}
        />
      </RecoomentContent>
      <ButtonBox>
        <button type="submit">등록</button>
        <button type="button" onClick={handleClickCancel}>취소</button>
      </ButtonBox>
    </Form>
  );
}
