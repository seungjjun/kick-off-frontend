export default function Post({ post }) {
  return (
    <article>
      <p>
        제목:
        {' '}
        {post.title}
      </p>
      <p>
        내용:
        {' '}
        {post.content}
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
        {post.imageUrl ? <img src={post.imageUrl} alt="uploadImage" />
          : null}
      </div>
    </article>
  );
}
