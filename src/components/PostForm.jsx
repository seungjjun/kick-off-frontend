/* eslint-disable react/jsx-props-no-spreading */
// import { useForm } from 'react-hook-form';
import { useForm } from 'react-hook-form';

export default function PostForm({
  postStore, navigate, submit, changeCategory, upload, image,
}) {
  const { register, handleSubmit } = useForm();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleChange = (target) => {
    changeCategory(target.target.value);
    console.log(target.target.value);
  };

  const onSubmit = (data) => {
    if (postStore.category === '') {
      alert('게시판을 선택해주세요');
      return;
    }

    submit(data);
  };

  const handleChangeImage = (e) => {
    upload(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select onChange={handleChange}>
          <option value="">
            게시판을 선택해 주세요
          </option>
          <option value="1">
            전체 게시판
          </option>
          <option value="2">EPL</option>
          <option value="3">SerieA</option>
        </select>
        <input
          id="input-title"
          type="text"
          placeholder="제목을 입력해 주세요"
          {...register('title')}
        />
        <textarea
          id="input-content"
          type="text"
          placeholder="내용을 입력하세요"
          {...register('content')}
        />
        <input
          type="file"
          accept="image/*"
          placeholder="파일 선택"
          id="image"
          onChange={handleChangeImage}
        />
        <div>
          {image ? <img src={image} alt="uploadImage" />
            : null}
        </div>
        <button type="button" onClick={handleClickCancel}>취소</button>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
