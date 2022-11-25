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

const CommentButtons = styled.div`
  display: flex;
  gap: 1.2em;

  button {
    padding: 0.5em 1em;
    border: none;
    border-radius: 8px;
  }
`;

export default function WrittenComments({
  myInformation, navigate, deleteCheckedComment, deleteCheckedRecomment,
}) {
  const [checkedComments, setCheckedComments] = useState([]);
  const [checkedRecomments, setCheckedRecomments] = useState([]);

  const handleChangeCommentCheck = (checked, commentId) => {
    if (checked) {
      setCheckedComments([...checkedComments, commentId]);
    }

    if (!checked) {
      setCheckedComments(checkedComments.filter((comment) => comment !== commentId));
    }
  };

  const handleChangeRecommentCheck = (checked, recommentId) => {
    if (checked) {
      setCheckedRecomments([...checkedRecomments, recommentId]);
    }

    if (!checked) {
      setCheckedRecomments(checkedRecomments.filter((recomment) => recomment !== recommentId));
    }
  };

  const handleClickDelete = () => {
    deleteCheckedRecomment(checkedRecomments);
    deleteCheckedComment(checkedComments);

    setCheckedComments([]);
    setCheckedRecomments([]);
  };

  const handleClickContent = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClickWrite = () => {
    navigate('/write');
  };

  const handleChangeAllCheck = (checked) => {
    if (checked) {
      const commentIds = [];
      const recommentIds = [];

      myInformation.comments.filter((comment) => comment.deleted === false)
        .map((comment) => commentIds.push(comment.id));

      myInformation.recomments.map((recomment) => recommentIds.push(recomment.id));

      setCheckedComments(commentIds);
      setCheckedRecomments(recommentIds);
    }

    if (!checked) {
      setCheckedComments([]);
      setCheckedRecomments([]);
    }
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
          {myInformation.recomments.length === 0 && myInformation.comments
            .filter((comment) => comment.deleted === false).length === 0 ? (
              <tr>
                <td>
                  작성한 댓글이 없습니다.
                </td>
              </tr>
            ) : (
              <>
                {myInformation.comments.filter((comment) => comment.deleted === false)
                  .map((comment) => (
                    <tr key={comment.id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) => handleChangeCommentCheck(e.target.checked, comment.id)}
                          checked={checkedComments.indexOf(comment.id) >= 0}
                        />
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
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeRecommentCheck(e.target.checked, recomment.id)}
                        checked={checkedRecomments.indexOf(recomment.id) >= 0}
                      />
                    </td>
                    <td onClick={() => handleClickContent(recomment.postId)}>
                      {recomment.content}
                    </td>
                    <td>
                      {recomment.commentDate}
                    </td>
                  </tr>
                ))}
              </>
            )}
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
        <CommentButtons>
          {myInformation.user.isMyToken ? (
            <button type="button" onClick={handleClickDelete}>삭제</button>
          ) : (
            null
          )}
          <button type="button" onClick={handleClickWrite}>글쓰기</button>
        </CommentButtons>
      </ButtonBox>
    </div>
  );
}
