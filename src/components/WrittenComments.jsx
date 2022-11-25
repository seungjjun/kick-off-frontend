import { useState } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
    height: 400px;
    width: 100%;
    border: 1px solid #CCC;
`;

const Thead = styled.thead`
    display: flex;
    margin-top: 1em;
    width: 100%;
`;

const Tr = styled.tr`
  display: flex;
  width: 100%;
`;

const CheckBox = styled.th`
    width: 5%;
    text-align: center;
`;

const CommentBox = styled.th`
    width: 60%;
    text-align: center;
`;

const CommentDateBox = styled.th`
    width: 35%;
    text-align: center;
`;

const Tbody = styled.tbody`
  display: block;
`;

const Nothing = styled.tr`
  display: flex;
  justify-content: center;
  margin-top: 2.2em;
  color: #CCC;
`;

const List = styled.tr`
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
`;

const Select = styled.td`
    width: 5%;
    text-align: center;
`;

const CommentContent = styled.td`
    width: 60%;
    text-align: center;
    cursor: pointer;
`;

const CommentDate = styled.td`
    width: 35%;
    text-align: center;
`;

const RecommentContent = styled.td`
    width: 60%;
    text-align: center;
    cursor: pointer;
`;

const RecommentDate = styled.td`
    width: 35%;
    text-align: center;
`;

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

  const handleClickDelete = async () => {
    await deleteCheckedComment(checkedComments);
    await deleteCheckedRecomment(checkedRecomments);

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
    <Container>
      <Table>
        <Thead>
          <Tr>
            <CheckBox>선택</CheckBox>
            <CommentBox>댓글</CommentBox>
            <CommentDateBox>작성일</CommentDateBox>
          </Tr>
        </Thead>
        <Tbody>
          {myInformation.recomments.length === 0 && myInformation.comments
            .filter((comment) => comment.deleted === false).length === 0 ? (
              <Nothing>
                <td>
                  작성한 댓글이 없습니다.
                </td>
              </Nothing>
            ) : (
              <>
                {myInformation.comments.filter((comment) => comment.deleted === false)
                  .map((comment) => (
                    <List key={comment.id}>
                      <Select>
                        <input
                          type="checkbox"
                          onChange={(e) => handleChangeCommentCheck(e.target.checked, comment.id)}
                          checked={checkedComments.indexOf(comment.id) >= 0}
                        />
                      </Select>
                      <CommentContent onClick={() => handleClickContent(comment.postId)}>
                        {comment.content}
                      </CommentContent>
                      <CommentDate>
                        {comment.commentDate}
                      </CommentDate>
                    </List>
                  ))}
                {myInformation.recomments.map((recomment) => (
                  <List key={recomment.id}>
                    <Select>
                      <input
                        type="checkbox"
                        onChange={(e) => handleChangeRecommentCheck(e.target.checked, recomment.id)}
                        checked={checkedRecomments.indexOf(recomment.id) >= 0}
                      />
                    </Select>
                    <RecommentContent onClick={() => handleClickContent(recomment.postId)}>
                      {recomment.content}
                    </RecommentContent>
                    <RecommentDate>
                      {recomment.commentDate}
                    </RecommentDate>
                  </List>
                ))}
              </>
            )}
        </Tbody>
      </Table>
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
    </Container>
  );
}
