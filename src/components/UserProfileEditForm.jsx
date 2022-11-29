/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Form = styled.form` 
  display: flex;
  flex-direction: column;
  margin-left: 13em;
`;
export default function UserProfileEditForm({ edits }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    edits.submit(data);
  };

  const handleChangeImage = (e) => {
    edits.upload(e);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="input-name">닉네임</label>
        <input
          id="input-name"
          type="text"
          value={edits.name}
          {...register('name', {
            required: true,
            onChange: (e) => edits.nameChange(e.target.value),
          })}
        />
        <input
          type="file"
          accept="image/*"
          placeholder="파일 선택"
          id="image"
          onChange={handleChangeImage}
        />
        {edits.editState === 'duplication' ? (
          <p>{edits.errorMessage}</p>
        ) : (
          null
        )}
        <div>
          {edits.image ? <img src={edits.image} alt="uploadImage" />
            : null}
        </div>
        <button type="submit">수정완료</button>
      </Form>
    </Container>
  );
}
