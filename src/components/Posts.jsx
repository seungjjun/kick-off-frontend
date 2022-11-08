/* eslint-disable react/prop-types */
export default function Posts({
  posts, commentNumber, recommentNumber, likes, users, categories, navigate,
}) {
  const handleClickPost = (id) => {
    navigate(`/post/${id}`);
  };

  const handleClickWrite = () => {
    navigate('/write');
  };

  const handleClickSchedule = () => {
    navigate('/schedule');
  };

  return (
    <section>
      <div>
        <button type="button" onClick={handleClickSchedule}>경기일정</button>
        <button type="button" onClick={handleClickWrite}>글쓰기</button>
      </div>
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
                {commentNumber.filter((comment) => comment === post.id).length
                + recommentNumber.filter((recomment) => recomment === post.id).length}
                ]
              </p>
              <p>
                {categories.find((category) => category.id === post.categoryId).name}
                {' '}
                /
                {' '}
                {users.find((user) => user.id === post.userId).name}
              </p>
              <p>
                {likes.filter((like) => like.postId === post.id).length}
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
