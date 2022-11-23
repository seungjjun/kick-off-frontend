/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

export default function UserProfileEditForm({ edits }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    edits.submit(data);
  };

  const handleChangeImage = (e) => {
    edits.upload(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </div>
  );
}
