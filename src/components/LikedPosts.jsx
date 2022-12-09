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

const Tbody = styled.tbody`
  display: block;
  height: 540px;
  overflow-y: auto;
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
          {myInformation.likedPosts.map((post) => (
            <List key={post.id}>
              <Select>
                <input
                  data-testid="checkbox"
                  type="checkbox"
                  onChange={(e) => handleChangeCheck(e.target.checked, post.id)}
                  checked={checkedPosts.indexOf(post.id) >= 0}
                />
              </Select>
              <Title onClick={() => handleClickContent(post.id)}>
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
          ))}
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
            <button type="button" onClick={handleClickCancel}>좋아요 취소</button>
          ) : (
            null
          )}
          <button type="button" onClick={handleClickWrite}>글쓰기</button>
        </PostButtons>
      </ButtonBox>
    </Container>
  );
}
