import { useForm } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(createRecomment)}>
      <div>
        {userName}
      </div>
      <div>
        <input
          id="input-content"
          type="text"
          placeholder="댓글을 입력하세요"
          {...register('content')}
        />
      </div>
      <div>
        <button type="submit">등록</button>
        <button type="button" onClick={handleClickCancel}>취소</button>
      </div>
    </form>
  );
}
