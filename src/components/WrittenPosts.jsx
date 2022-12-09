/* eslint-disable jsx-a11y/label-has-associated-control */
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

const Tbody = styled.tbody`
  display: block;
  height: 540px;
  overflow-y: auto;
`;

const Tr = styled.tr`
  display: flex;
  width: 100%;
`;

const Nothing = styled.tr`
  display: flex;
  justify-content: center;
  margin-top: 2.2em;
  color: #CCC;
`;

const CheckBox = styled.th`
    width: 5%;
    text-align: center;
`;

const TitleBox = styled.th`
    width: 40%;
    text-align: center;
`;

const AuthorBox = styled.th`
    width: 30%;
    text-align: center;
`;

const PostDateBox = styled.th`
    width: 15%;
    text-align: center;
`;

const HitBox = styled.th`
    width: 10%;
    text-align: center;
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

const Title = styled.td`
    width: 40%;
    text-align: center;
    cursor: pointer;
`;

const Author = styled.td`
    width: 30%;
    text-align: center;
`;

const PostDate = styled.td`
    width: 15%;
    text-align: center;
`;

const Hit = styled.td`
    width: 10%;
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

const PostButtons = styled.div`
  display: flex;
  gap: 1.2em;

  button {
    padding: 0.5em 1em;
    border: none;
    border-radius: 8px;
  }
`;

export default function WrittenPosts({ myInformation, navigate, deleteCheckedPost }) {
  const [checkPosts, setCheckPosts] = useState([]);

  const handleClickTitle = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClickDelete = () => {
    deleteCheckedPost(checkPosts);

    setCheckPosts([]);
  };

  const handleClickWrite = () => {
    navigate('/write');
  };

  const handleChangeCheck = (checked, postId) => {
    if (checked) {
      setCheckPosts([...checkPosts, postId]);
    }

    if (!checked) {
      setCheckPosts(checkPosts.filter((checkedPostId) => checkedPostId !== postId));
    }
  };

  const handleChangeAllCheck = (checked) => {
    if (checked) {
      const postIds = [];
      myInformation.posts.map((post) => postIds.push(post.id));
      setCheckPosts(postIds);
    }

    if (!checked) {
      setCheckPosts([]);
    }
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <CheckBox>선택</CheckBox>
            <TitleBox>제목</TitleBox>
            <AuthorBox>작성자</AuthorBox>
            <PostDateBox>작성일</PostDateBox>
            <HitBox>조회</HitBox>
          </Tr>
        </Thead>
        <Tbody>
          {myInformation.posts.length === 0 ? (
            <Nothing>
              <td>
                작성한 게시글이 없습니다
              </td>
            </Nothing>
          ) : (
            myInformation.posts.map((post) => (
              <List key={post.id}>
                <Select>
                  <input
                    data-testid="checkbox"
                    type="checkbox"
                    onChange={(e) => handleChangeCheck(e.target.checked, post.id)}
                    checked={checkPosts.indexOf(post.id) >= 0}
                  />
                </Select>
                <Title onClick={() => handleClickTitle(post.id)}>
                  {post.postInformation.title}
                </Title>
                <Author>
                  {myInformation.user.name}
                </Author>
                <PostDate>
                  {post.createdAt}
                </PostDate>
                <Hit>
                  {post.hit}
                </Hit>
              </List>
            ))
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
        <PostButtons>
          {myInformation.user.isMyToken ? (
            <button type="button" onClick={handleClickDelete}>삭제</button>
          ) : (
            null
          )}
          <button type="button" onClick={handleClickWrite}>글쓰기</button>
        </PostButtons>
      </ButtonBox>
    </Container>
  );
}
