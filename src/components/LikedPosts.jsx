export default function LikedPosts({ myInformation, navigate }) {
  const handleClickContent = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {myInformation.likedPosts.map((post) => (
            <tr key={post.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td onClick={() => handleClickContent(post.id)}>
                {post.postInformation.title}
              </td>
              <td>
                {myInformation.user.name}
              </td>
              <td>
                {post.createdAt}
              </td>
              <td>
                {post.hit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
