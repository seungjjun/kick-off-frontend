export default function WrittenComments({ myInformation, navigate }) {
  const handleClickContent = (postId) => {
    navigate(`/post/${postId}`);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>댓글</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {myInformation.comments.map((comment) => (
            <tr key={comment.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td onClick={() => handleClickContent(comment.postId)}>
                {comment.content}
              </td>
              <td>
                {comment.commentDate}
              </td>
            </tr>
          ))}
          {myInformation.recomments.map((recomment) => (
            <tr key={recomment.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td onClick={() => handleClickContent(recomment.postId)}>
                {recomment.content}
              </td>
              <td>
                {recomment.commentDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
