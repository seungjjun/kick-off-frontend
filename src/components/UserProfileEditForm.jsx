/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Form = styled.form` 
  display: flex;

  label {
    margin-bottom: 0.5em
  }

  input[type="file"] {
    position: absolute;
  /* width: 1px; */
  /* height: 1px; */
  /* padding: 0; */
  /* margin: -1px; */
  /* overflow: hidden; */
  clip:rect(0,0,0,0);
  border: 0;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-left: 1em;

  input {
    width: 14.6em;
  }

  button {
    margin-top: 0.6em;
    padding: 0.3em 0;
  }
`;

const FileImage = styled.label`
  align-self: flex-end;
  width: 1.4em;
  height: 1.4em;
  background: url('https://user-images.githubusercontent.com/104769120/206356130-32130d97-98a1-4563-bad7-5fcca9690e36.png');
  background-size: cover;
`;

const InputName = styled.input`
  padding: 0.3em 1.2em;
  border: 1px solid #CCC;
`;

const ImageBox = styled.div`
  align-self: center;
`;

const ProfileImage = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 3em;
`;

const BasicProfileImage = styled.div`
  width: 6em;
  height: 6em;
  background: url('https://user-images.githubusercontent.com/104769120/203972344-e8de6516-2d57-4afd-b1ef-63a7471f3e5a.png');
  background-size: cover;
  border-radius: 50%;
`;

const CancelButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const EditCancel = styled.button`
  display: flex;
  margin-left: 1em;
  padding: 1em;
`;

const Error = styled.p`
  margin-top: 0.8em;
  color: #FF424D;
`;

export default function UserProfileEditForm({ edits, myInformation }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    edits.submit(data);
  };

  const handleChangeImage = (e) => {
    edits.upload(e);
  };

  const handleChangeEditState = () => {
    edits.changeEditState();
  };

  return (
    <Container>
      <ImageBox>
        {myInformation.user.profileImage === null && !edits.image ? (
          <BasicProfileImage />
        ) : !edits.image ? (
          <ProfileImage src={myInformation.user.profileImage} alt="userProfileImage" />
        ) : (
          <ProfileImage src={edits.image} alt="uploadImage" />
        )}
      </ImageBox>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileImage htmlFor="input-image" />
        <input
          type="file"
          accept="image/*"
          placeholder="파일 선택"
          id="input-image"
          onChange={handleChangeImage}
        />
        <NameBox>
          <label htmlFor="input-name">{myInformation.user.name}</label>
          <InputName
            id="input-name"
            type="text"
            value={edits.name}
            placeholder="변경할 닉네임을 입력해주세요."
            {...register('name', {
              required: true,
              onChange: (e) => edits.nameChange(e.target.value),
            })}
          />
          {edits.editState === 'duplication' ? (
            <Error>{edits.errorMessage}</Error>
          ) : (
            null
          )}
          <button type="submit">수정완료</button>
        </NameBox>
      </Form>
      <CancelButtonBox>
        <EditCancel type="button" onClick={handleChangeEditState}>수정취소</EditCancel>
      </CancelButtonBox>
    </Container>
  );
}
