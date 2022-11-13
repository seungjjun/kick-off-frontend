import { useForm } from 'react-hook-form';

import CommentEditForm from './CommentEditForm';

import RecommentEditForm from './RecommentEditForm';

import RecommentForm from './RecommentForm';

export default function Comment({
  posts, pages, comments, recomments,
}) {
  const { register, handleSubmit } = useForm();

  const createComment = (data) => {
    comments.submitComment(data);
  };

  const handleClickRecomment = (commentId) => {
    recomments.changeRecommentFormState(commentId);
  };

  const handleClickPage = (event) => {
    pages.changeCommentNumber(event.target.innerText - 1);
  };

  const handleClickNextPage = () => {
    pages.nextPage();
  };

  const handleClickPreviousPage = () => {
    pages.previousPage();
  };

  const handleClcikCommentModify = (commentId) => {
    comments.changeCommentEditState(commentId);
  };

  const handleClcikRecommentModify = (recommentId) => {
    recomments.changeRecommentEditState(recommentId);
  };

  const handleClickCommentDelete = (commentId) => {
    comments.deleteComment(commentId);
  };

  const handleClickRecommentDelete = (recommentId) => {
    recomments.deleteRecomment(recommentId);
  };

  return (
    <div>
      <ul>
        {posts.comments.length === undefined
          ? <p>Loading...</p>
          : posts.comments.map((comment) => (
            <ul key={comment.id}>
              <li key={comment.id}>
                {posts.users.map((user) => (
                  user.id === comment.userId ? (
                    user.name
                  ) : null
                ))}
                {comment.deleted ? (
                  <p>삭제된 댓글입니다.</p>
                ) : (
                  <>
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
                    <button type="button" onClick={() => handleClcikCommentModify(comment.id)}>수정</button>
                    <button type="button" onClick={() => handleClickCommentDelete(comment.id)}>삭제</button>
                  </>
                )}
                {comments.commentEditState === comment.id ? (
                  <CommentEditForm
                    commentId={comment.id}
                    initialContent={comment.content}
                    modifyComment={comments.modifyComment}
                    changeCommentEditState={comments.changeCommentEditState}
                  />
                ) : (
                  null
                )}
                {comments.recommentVisibleState === comment.id ? (
                  <RecommentForm
                    changeRecommentFormState={recomments.changeRecommentFormState}
                    submitRecomment={recomments.submitRecomment}
                    commentId={comment.id}
                    userName={posts.userName}
                    content={comment.content}
                  />
                ) : null}
              </li>
              {posts.recomments.map((recomment) => (
                recomment.commentId === comment.id ? (
                  <li key={recomment.id}>
                    {posts.users.map((user) => (
                      user.id === recomment.userId ? (
                        user.name
                      ) : null
                    ))}
                    {' '}
                    {recomment.content}
                    {' '}
                    {recomment.commentDate}
                    <button type="button" onClick={() => handleClcikRecommentModify(recomment.id)}>수정</button>
                    <button type="button" onClick={() => handleClickRecommentDelete(recomment.id)}>삭제</button>
                    {recomments.recommentEditState === recomment.id ? (
                      <RecommentEditForm
                        recommentId={recomment.id}
                        initialContent={recomment.content}
                        modifyRecomment={recomments.modifyRecomment}
                        changeRecommentEditState={recomments.changeRecommentEditState}
                      />
                    ) : null}
                  </li>
                ) : null
              ))}
            </ul>
          ))}
      </ul>
      {pages.isPreviousPage ? (
        <button type="button" onClick={handleClickPreviousPage}>이전</button>
      ) : null}
      {pages.pageButtons.map((pageButton) => (
        <button
          key={pageButton}
          type="button"
          onClick={(event) => handleClickPage(event)}
        >
          {pageButton}
        </button>
      ))}
      {pages.isNextPage ? (
        <button type="button" onClick={handleClickNextPage}>다음</button>
      ) : null}
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
