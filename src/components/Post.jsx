export default function Post({
  post, category, author, likes,
}) {
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
        <button type="button">
          좋아요
          {' '}
          {likes.length}
        </button>
      </div>
      <div>댓글 창 (미구현)</div>
    </article>
  );
}
