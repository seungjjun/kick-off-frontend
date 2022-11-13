import Comment from './Comment';

export default function Post({
  posts, pages, comments, recomments, countLike, modifyPost, deletePost,
}) {
  const handleClickLike = () => {
    countLike();
  };

  const handleClcikModify = () => {
    modifyPost(posts.post.id);
  };

  const handleClickDelete = () => {
    deletePost(posts.post.id);
  };

  return (
    <div>
      {Object.keys(posts.post).length === 0 ? (
        <p>loading</p>
      ) : (
        <article>
          <div>
            <button type="button" onClick={handleClcikModify}>수정</button>
            <button type="button" onClick={handleClickDelete}>삭제</button>
          </div>
          <p>
            제목:
            {' '}
            {posts.post.postInformation.title}
          </p>
          <p>
            {posts.category.name}
            {' '}
            /
            {' '}
            {posts.user.name}
          </p>
          <p>
            조회수:
            {' '}
            {posts.post.hit}
          </p>
          <p>
            등록날짜:
            {' '}
            {posts.post.createdAt}
          </p>
          <div>
            내용:
            {' '}
            {posts.post.postInformation.content}
            <div>
              {posts.post.imageUrl ? <img src={posts.post.imageUrl} alt="uploadImage" />
                : null}
            </div>
            <button type="button" onClick={handleClickLike}>
              좋아요
            </button>
            <p>{posts.likes.filter((like) => like.postId === posts.post.id).length}</p>
          </div>
          <Comment
            posts={posts}
            pages={pages}
            comments={comments}
            recomments={recomments}
          />
        </article>
      )}

    </div>
  );
}
