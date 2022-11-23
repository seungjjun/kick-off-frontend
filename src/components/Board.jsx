import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
    margin-top: 1em;
`;

const Nothing = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 5em;
`;

const ImageBox = styled.div`
  display: inline;
  float: left;
  cursor: pointer;
`;

const BlankImageBox = styled.div`
  width: 4.5em;
  height: 3.8em;
  background-size: contain;
  background: url('https://user-images.githubusercontent.com/104769120/200729388-cf5186bd-0a9e-4d3a-a1b8-00f24dddb193.png') no-repeat center;
`;

const PostImage = styled.img`
  width: 4.5em;
  height: 3.8em;
`;
const ContentBox = styled.div`
  display: inline;
`;

const Title = styled.p`
  display: block;
  cursor: pointer;
`;

const Category = styled.button`
  margin-top: 1em;
  font-size: 0.7em;
  border: none;
  background-color: #FFF;
`;

const UserName = styled.p`
  margin-top: 0.8em;
  font-size: 0.7em;
`;

const Name = styled.button`
  font-size: 1em;
  border: none;
  background-color: #FFF;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
`;

const PageButton = styled.button`
    margin-left: 1em;
    border: none;
    background-color: #fff;
`;

const PreviousButton = styled.button`
    border: none;
    background-color: #FFF;
`;

const NextButton = styled.button`
    margin-left: 1em;
    border: none;
    background-color: #FFF;
`;

export default function Board({
  accessToken, boardId, posts, navigate, commentNumber, recommentNumber, pagination,
}) {
  const postList = posts.posts;

  const handleClickPost = (id) => {
    navigate(`/post/${id}`);
  };

  const handleClickWrite = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    navigate('/write');
  };

  const handleClickSchedule = () => {
    navigate('/schedule');
  };

  const handleClickPage = (event) => {
    pagination.changePageNumber(event.target.innerText - 1);
  };

  const handleClickNextPage = () => {
    pagination.nextPage();
  };

  const handleClickPreviousPage = () => {
    pagination.previousPage();
  };

  const handleClickBoard = (boardId) => {
    navigate(`/board?id=${boardId}`);
  };

  const handleClickName = (userId) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    navigate(`/users?id=${userId}`);
  };

  return (
    <section>
      <div>
        <button type="button" onClick={handleClickWrite}>글쓰기</button>
        {boardId !== '1' && boardId !== undefined ? (
          <button type="button" onClick={handleClickSchedule}>경기일정</button>
        ) : null}
      </div>
      <article>
        {Object.keys(posts).length === 0 || postList.length === 0 ? (
          <Nothing>게시글이 없습니다</Nothing>
        ) : (
          <List>
            {postList.map((post) => (
              <Item key={post.id}>
                <ImageBox>
                  {post.imageUrl ? (
                    <PostImage
                      src={post.imageUrl}
                      onClick={() => handleClickPost(post.id)}
                      alt="uploadImage"
                    />
                  )
                    : <BlankImageBox />}
                </ImageBox>
                <ContentBox>
                  <Title
                    onClick={() => handleClickPost(post.id)}
                  >
                    {post.postInformation.title}
                    {' '}
                    [
                    {commentNumber.filter((comment) => comment === post.id).length
                + recommentNumber.filter((recomment) => recomment === post.id).length}
                    ]
                  </Title>
                  <Category type="button" onClick={() => handleClickBoard(post.boardId)}>
                    {posts.boards.find((board) => board.id === post.boardId).boardName.value}
                  </Category>
                  <UserName>
                    <Name type="button" onClick={() => handleClickName(post.userId.userId)}>
                      {posts.users.find((user) => user.id === post.userId.userId).name}
                    </Name>
                    {' '}
                    /
                    {' '}
                    {posts.likes.filter((like) => like.postId === post.id).length}
                  </UserName>
                </ContentBox>
              </Item>
            ))}
          </List>
        )}
      </article>
      <Pagination>
        {pagination.isPreviousPage ? (
          <PreviousButton type="button" onClick={handleClickPreviousPage}>이전</PreviousButton>
        ) : null}
        <ul>
          {pagination.pageButtons.map((pageButton) => (
            <PageButton
              key={pageButton}
              type="button"
              onClick={(event) => handleClickPage(event)}
            >
              {pageButton}
            </PageButton>
          ))}
        </ul>
        {pagination.isNextPage ? (
          <NextButton type="button" onClick={handleClickNextPage}>다음</NextButton>
        ) : null}
      </Pagination>
    </section>
  );
}
