export default function Post({ post }) {
  return (
    <div>
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
    </div>
  );
}
