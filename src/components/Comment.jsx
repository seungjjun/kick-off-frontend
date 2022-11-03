export default function Comment({ comments, recomments, users }) {
  return (
    <div>
      <ul>
        {comments.length === undefined
          ? <p>Loading...</p>
          : comments.map((comment) => (
            <ul key={comment.id}>
              <li key={comment.id}>
                {users.map((user) => (
                  user.id === comment.userId ? (
                    user.name
                  ) : null
                ))}
                {' '}
                {comment.content}
                {' '}
                {comment.commentDate}
              </li>
              {recomments.map((recomment) => (
                recomment.commentId === comment.id ? (
                  <li key={recomment.id}>
                    {users.map((user) => (
                      user.id === recomment.userId ? (
                        user.name
                      ) : null
                    ))}
                    {' '}
                    {recomment.content}
                    {' '}
                    {recomment.commentDate}
                  </li>
                ) : null
              ))}
            </ul>
          ))}
      </ul>
      <form>
        <button type="button">등록</button>
      </form>
    </div>
  );
}
