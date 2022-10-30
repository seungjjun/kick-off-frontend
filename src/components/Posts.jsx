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
                {post.commentNumber === null ? 0 : (post.commentNumber) }
                ]
              </p>
              <p>
                {post.category}
              </p>
              <p>
                {post.author}
                {' '}
                /
                {' '}
                {post.createdAt}
                {' '}
                {post.hit}
              </p>
              <p>
                {post.likeNumber === null ? 0 : post.likeNumber}
              </p>
              <div>
                {post.imageUrl ? <img src={post.imageUrl} alt="uploadImage" />
                  : null}
              </div>
            </button>
          ))}
        </ul>
      </article>
    </section>
  );
}
