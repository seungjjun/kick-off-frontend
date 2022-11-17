/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

export default function PostEditForm({
  category, navigate, submit, changeCategory, upload,
  image, title, content, titleChange, contentChange,
}) {
  const { register, handleSubmit } = useForm();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleChange = (target) => {
    changeCategory(target.target.value);
  };

  const onSubmit = (data) => {
    if (category === '') {
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
        <select
          id="select-category"
          onChange={handleChange}
        >
          <option value="">
            게시판을 선택해 주세요
          </option>
          <option value="1">
            전체 게시판
          </option>
          <option value="2">EPL</option>
          <option value="3">LaLiga</option>
          <option value="4">SerieA</option>
          <option value="5">Bundesliga</option>
        </select>
        <input
          id="input-title"
          type="text"
          value={title}
          {...register('title', {
            required: true,
            onChange: (e) => titleChange(e.target.value),
          })}
        />
        <textarea
          id="input-content"
          type="text"
          value={content}
          {...register('content', {
            required: true,
            onChange: (e) => contentChange(e.target.value),
          })}
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
        <button type="button" onClick={handleClickCancel}>수정취소</button>
        <button type="submit">수정완료</button>
      </form>
    </div>
  );
}
