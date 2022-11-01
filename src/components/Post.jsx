export default function Post({
  post, category, author, likes, countLike,
}) {
  const handleClickLike = () => {
    countLike();
  };

  return (
    <article>
      <p>
        제목:
        {' '}
        {post.title}
      </p>
      <p>
        {category.name}
        {' '}
        /
        {' '}
        {author.name}
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
        {post.content}
        <div>
          {post.imageUrl ? <img src={post.imageUrl} alt="uploadImage" />
            : null}
        </div>
        <button type="button" onClick={handleClickLike}>
          좋아요
        </button>
        <p>{likes.length}</p>
      </div>
      <div>댓글 창 (미구현)</div>
    </article>
  );
}
