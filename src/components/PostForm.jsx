/* eslint-disable react/jsx-props-no-spreading */
// import { useForm } from 'react-hook-form';

import { useForm } from 'react-hook-form';

export default function PostForm({
  postStore, navigate, submit, changeCategory,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleClickCancel = () => {
    navigate('/');
  };

  const handleChange = (target) => {
    changeCategory(target.target.value);
  };

  const onSubmit = async (data) => {
    if (postStore.category === '') {
      alert('게시판을 선택해주세요');
      return;
    }
    submit(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select onChange={handleChange}>
          <option value="">게시판을 선택해 주세요</option>
          <option value="EPL">EPL</option>
          <option value="SerieA">SerieA</option>
        </select>
        <input
          id="input-title"
          type="text"
          placeholder="제목을 입력해 주세요"
          {...register('title')}
        />
        <input
          id="input-content"
          type="text"
          placeholder="내용을 입력하세요"
          {...register('content')}
        />
        <input type="file" />
        <button type="button" onClick={handleClickCancel}>취소</button>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
