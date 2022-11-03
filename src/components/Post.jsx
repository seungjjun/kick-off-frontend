import Comment from './Comment';

export default function Post({
  post, category, likes, comments, recomments, user, countLike, users,
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
        {user.name}
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
        <p>{likes.filter((like) => like.postId === post.id).length}</p>
      </div>
      <Comment
        comments={comments}
        recomments={recomments}
        users={users}
      />
    </article>
  );
}
