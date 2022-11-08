import { useForm } from 'react-hook-form';

import RecommentForm from './RecommentForm';

export default function Comment({
  comments, recomments, users, submitComment, recommentVisibleState,
  changeRecommentFormState, submitRecomment, userName,
}) {
  const { register, handleSubmit } = useForm();

  const createComment = (data) => {
    submitComment(data);
  };

  const handleClickRecomment = (commentId) => {
    changeRecommentFormState(commentId);
  };

  return (
    <div>
      <ul>
        {comments.length === undefined
          ? <p>Loading...</p>
          : comments.map((comment) => (
            <ul key={comment.id}>
              <li key={comment.id}>
                {users.map((user) => (
                  user.id === comment.userId ? (
                    user.name
                  ) : null
                ))}
                {' '}
                {comment.content}
                {' '}
                {comment.commentDate}
                {' '}
                <button
                  type="button"
                  onClick={() => handleClickRecomment(comment.id)}
                >
                  답글쓰기
                </button>
                {recommentVisibleState === comment.id ? (
                  <RecommentForm
                    changeRecommentFormState={changeRecommentFormState}
                    submitRecomment={submitRecomment}
                    commentId={comment.id}
                    userName={userName}
                  />
                ) : null}
              </li>
              {recomments.map((recomment) => (
                recomment.commentId === comment.id ? (
                  <li key={recomment.id}>
                    {users.map((user) => (
                      user.id === recomment.userId ? (
                        user.name
                      ) : null
                    ))}
                    {' '}
                    {recomment.content}
                    {' '}
                    {recomment.commentDate}
                  </li>
                ) : null
              ))}
            </ul>
          ))}
      </ul>
      <form onSubmit={handleSubmit(createComment)}>
        <input
          id="input-content"
          type="text"
          placeholder="댓글을 입력하세요"
          {...register('content')}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
