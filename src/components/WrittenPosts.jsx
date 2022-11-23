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
  flex-direction: row;

  span {
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

export default function WrittenPosts({ myInformation, navigate, deletePost }) {
  const handleClickTitle = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClickDelete = () => {
    deletePost(postId);
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
          {myInformation.posts.map((post) => (
            <List key={post.id}>
              <Select>
                <input type="checkbox" />
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
          ))}
        </Tbody>
      </Table>
      <ButtonBox>
        <CheckBoxButtons>
          <input type="checkbox" />
          <span>전체선택</span>
        </CheckBoxButtons>
        <PostButtons>
          {myInformation.user.isMyToken ? (
            <button type="button" onClick={handleClickDelete}>삭제</button>
          ) : (
            null
          )}
          <button type="button">글쓰기</button>
        </PostButtons>
      </ButtonBox>
    </Container>
  );
}
