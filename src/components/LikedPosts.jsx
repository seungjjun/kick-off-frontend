import { useState } from 'react';
import styled from 'styled-components';

const ButtonBox = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: space-between;
`;

const CheckBoxButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;

  label {
    display: flex;
    align-items: center;
    margin-left: 1em;
  }

  input {
    width: 1.2em;
  }
`;

const PostButtons = styled.div`
  display: flex;
  gap: 1.2em;

  button {
    padding: 0.5em 1em;
    border: none;
    border-radius: 8px;
  }
`;

export default function LikedPosts({ myInformation, navigate, cancelCheckedPost }) {
  const [checkedPosts, setCheckedPosts] = useState([]);

  const handleClickContent = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClickWrite = () => {
    navigate('/write');
  };

  const handleClickCancel = () => {
    cancelCheckedPost(checkedPosts);

    setCheckedPosts([]);
  };

  const handleChangeCheck = (checked, postId) => {
    if (checked) {
      setCheckedPosts([...checkedPosts, postId]);
    }

    if (!checked) {
      setCheckedPosts(checkedPosts.filter((checkedPostId) => checkedPostId !== postId));
    }
  };

  const handleChangeAllCheck = (checked) => {
    if (checked) {
      const postIds = [];
      myInformation.likedPosts.map((post) => postIds.push(post.id));
      setCheckedPosts(postIds);
    }

    if (!checked) {
      setCheckedPosts([]);
    }
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
                <input
                  data-testid="checkbox"
                  type="checkbox"
                  onChange={(e) => handleChangeCheck(e.target.checked, post.id)}
                  checked={checkedPosts.indexOf(post.id) >= 0}
                />
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
      <ButtonBox>
        <CheckBoxButtons>
          <label htmlFor="checkPost">전체선택</label>
          <input
            id="checkPost"
            type="checkbox"
            onChange={(e) => handleChangeAllCheck(e.target.checked)}
          />
        </CheckBoxButtons>
        <PostButtons>
          {myInformation.user.isMyToken ? (
            <button type="button" onClick={handleClickCancel}>좋아요 취소</button>
          ) : (
            null
          )}
          <button type="button" onClick={handleClickWrite}>글쓰기</button>
        </PostButtons>
      </ButtonBox>
    </div>
  );
}
