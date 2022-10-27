/* eslint-disable react/prop-types */
export default function Posts({ posts }) {
  return (
    <section>
      <article>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>
                {post.title}
                {' '}
                [
                {post.commentNumber}
                ]
              </p>
              <p>
                {post.category}
              </p>
              <p>
                {post.author}
                {' '}
                {post.likeNumber}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
