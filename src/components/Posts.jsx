/* eslint-disable react/prop-types */
export default function Posts({ posts, navigate }) {
  const handleClickPost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <section>
      <article>
        <ul>
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => handleClickPost(post.id)}
            >
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
            </button>
          ))}
        </ul>
      </article>
    </section>
  );
}
