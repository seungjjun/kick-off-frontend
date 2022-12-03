/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Form = styled.form`
  width: 100%;
`;

const Select = styled.select`
  display: flex;
  padding: 0.5em 1.2em;
  margin-bottom: 1em;
  border: 1px solid #CCC;
  color: #979797;
`;

const InputTitle = styled.input`
  display: flex;
  width: 100%;
  margin-bottom: 1em;
  padding: 0.7em 1em;
  border: 1px solid #CCC;
`;

const ContentBox = styled.textarea`
  display: block;
  padding: 1.4em 1em;
  width: 100%;
  height: 300px;
  border: 1px solid #CCC;
`;

const InputFile = styled.input`
  display: flex;
  margin-top: 1em;
`;

const UploadImage = styled.div`
  display: flex;
  margin-top: 1em;

  img {
    width: 100px;
    height: 100px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid #CCC;

  button {
    padding: 0.8em 0;
    color: #FFF;
  }
`;

const CancelButton = styled.button`
  width: 47%;
`;

const SubmitButton = styled.button`
  width: 47%;
`;

export default function PostForm({
  boardList, navigate, submit, changeBoard, upload, image,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleChange = (target) => {
    changeBoard(target.target.value);
  };

  const onSubmit = (data) => {
    // if (postStore.category === '') {
    //   alert('게시판을 선택해주세요');
    //   return;
    // }

    submit(data);
  };

  const handleChangeImage = (e) => {
    upload(e);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select
          id="select-board"
          onChange={handleChange}
        >
          <option value="">
            게시판을 선택해 주세요
          </option>
          {boardList.map((board) => (
            <option
              key={board.id}
              value={board.id}
            >
              {board.boardName.value}
            </option>
          ))}
        </Select>
        <InputTitle
          id="input-title"
          type="text"
          placeholder="제목을 입력해 주세요"
          error={errors.title}
          {...register('title', {
            required: { value: true },
          })}
        />
        {errors.title ? (
          <p>제목을 입력해주세요</p>
          // alert('제목을 입력해주세요!!')
        ) : null}
        <ContentBox
          id="input-content"
          type="text"
          placeholder="내용을 입력하세요"
          {...register('content')}
        />
        <InputFile
          type="file"
          accept="image/*"
          placeholder="파일 선택"
          id="image"
          onChange={handleChangeImage}
        />
        <UploadImage>
          {image ? <img src={image} alt="uploadImage" />
            : null}
        </UploadImage>
        <Buttons>
          <CancelButton type="button" onClick={handleClickCancel}>취소</CancelButton>
          <SubmitButton type="submit">등록</SubmitButton>
        </Buttons>
      </Form>
    </Container>
  );
}
