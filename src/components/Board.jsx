/* eslint-disable no-mixed-operators */
import styled from 'styled-components';
import SearchForm from './SearchForm';

const BoardName = styled.h2`
  font-size: 1.6em;
  font-weight: bold;
`;

const SideButtons = styled.div`
  display: flex;
  justify-content: end;
  margin: 0.5em 0;
  gap: 1em;

  button {
    padding: 0.3em 1em;
    color: #FFF;
  }
`;

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
    margin: 5em;
`;

const ImageBox = styled.div`
  display: inline;
  float: left;
  cursor: pointer;
`;

const BlankImageBox = styled.div`
  width: 4.5em;
  height: 3.8em;
  background: url('https://user-images.githubusercontent.com/104769120/200729388-cf5186bd-0a9e-4d3a-a1b8-00f24dddb193.png');
  background-size: cover;
  margin-right: .7em;
`;

const PostImage = styled.img`
  width: 4.5em;
  height: 3.8em;
  margin-right: .7em;
`;
const ContentBox = styled.div`
  display: inline;
`;

const Title = styled.p`
  display: block;
  cursor: pointer;
`;

const Category = styled.p`
  margin-top: 1em;
  font-size: 0.7em;
  border: none;
  color: #000;
  background-color: #FFF;
  cursor: pointer;
`;

const UserName = styled.p`
  margin-top: 0.8em;
  font-size: 0.7em;
`;

const Name = styled.button`
  font-size: 1em;
  border: none;
  color: #000;
  background-color: #FFF;
  cursor: pointer;

  :hover {
    background-color: #FFF;
  }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;

    button{
      :hover{
        background-color: #FFF;
      }
    }
`;

const PageButton = styled.button`
    margin-left: 1em;
    border: none;
    background-color: #fff;
    color: #000;
`;

const PreviousButton = styled.button`
    border: none;
    background-color: #FFF;
    color: #000;
`;

const NextButton = styled.button`
    margin-left: 1em;
    border: none;
    background-color: #FFF;
    color: #000;
`;

export default function Board({
  accessToken, boardName, boardId, posts, navigate, commentNumber, recommentNumber,
  pagination, submit, changeKeywordType, moveToUserPage,
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

  const handleClickSchedule = (boardName) => {
    navigate(`/schedule/${boardName}`);
  };

  const handleClickPage = (event) => {
    const page = event.target.innerText - 1;

    pagination.changePageNumber(page);
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

  const handleClickName = (userName, userId) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    moveToUserPage(userName, userId);
  };

  return (
    <section>
      <BoardName>{boardName}</BoardName>
      <SideButtons>
        <button type="button" onClick={handleClickWrite}>글쓰기</button>
        {boardId === '2' || boardId === '3' || boardId === '4' || boardId === '5' && boardId !== undefined ? (
          <button type="button" onClick={() => handleClickSchedule(boardName)}>경기일정</button>
        ) : null}
      </SideButtons>
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
                    : <BlankImageBox onClick={() => handleClickPost(post.id)} />}
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
                  <Category onClick={() => handleClickBoard(post.boardId)}>
                    {posts.boards.find((board) => board.id === post.boardId).boardName}
                  </Category>
                  <UserName>
                    <Name
                      onClick={() => handleClickName(
                        posts.users.find((user) => user.id === post.userId).name,
                        post.userId.userId,
                      )}
                    >
                      {posts.users.find((user) => user.id === post.userId).name}
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
      <SearchForm
        submit={submit}
        changeKeywordType={changeKeywordType}
      />
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
