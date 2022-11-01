/* eslint-disable react/prop-types */
export default function cPosts({ posts, navigate }) {
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
                {post.comments.length}
                ]
              </p>
              <p>
                {post.category.name}
                {' '}
                /
                {' '}
                {post.user.name}
              </p>
              <p>
                {post.likes.length}
                {' '}
                {post.createdAt}
                {' '}
                {post.hit}
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
