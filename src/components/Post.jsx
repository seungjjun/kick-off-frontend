import Comment from './Comment';

export default function Post({
  post, category, likes, comments, recomments, user, countLike, users,
  submitComment, recommentVisibleState, changeRecommentFormState, submitRecomment,
  userName, changeCommentNumber, isPreviousPage, isNextPage, nextPage, previousPage,
  pageButtons, modify,
}) {
  const handleClickLike = () => {
    countLike();
  };

  const handleClcikModify = () => {
    modify(post.id);
  };

  return (
    <div>
      {Object.keys(post).length === 0 ? (
        <p>loading</p>
      ) : (
        <article>
          <div>
            <button type="button" onClick={handleClcikModify}>수정</button>
          </div>
          <p>
            제목:
            {' '}
            {post.postInformation.title}
          </p>
          <p>
            {category.name}
            {' '}
            /
            {' '}
            {user.name}
          </p>
          <p>
            조회수:
            {' '}
            {post.hit}
          </p>
          <p>
            등록날짜:
            {' '}
            {post.createdAt}
          </p>
          <div>
            내용:
            {' '}
            {post.postInformation.content}
            <div>
              {post.imageUrl ? <img src={post.imageUrl} alt="uploadImage" />
                : null}
            </div>
            <button type="button" onClick={handleClickLike}>
              좋아요
            </button>
            <p>{likes.filter((like) => like.postId === post.id).length}</p>
          </div>
          <Comment
            comments={comments}
            recomments={recomments}
            users={users}
            submitComment={submitComment}
            recommentVisibleState={recommentVisibleState}
            changeRecommentFormState={changeRecommentFormState}
            submitRecomment={submitRecomment}
            userName={userName}
            changeCommentNumber={changeCommentNumber}
            isPreviousPage={isPreviousPage}
            isNextPage={isNextPage}
            nextPage={nextPage}
            previousPage={previousPage}
            pageButtons={pageButtons}
          />
        </article>
      )}

    </div>
  );
}
