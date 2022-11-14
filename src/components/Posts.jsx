import styled from 'styled-components';

import HotPosts from './HotPosts';

const Container = styled.div`

`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Post = styled.li`
  margin-bottom: 1em;
`;

const ImageBox = styled.div`
  display: inline;
  float: left;
  cursor: pointer;
`;

const BlankImageBox = styled.div`
  width: 8em;
  height: 8em;
  background-size: contain;
  background: url('https://user-images.githubusercontent.com/104769120/200729388-cf5186bd-0a9e-4d3a-a1b8-00f24dddb193.png') no-repeat center;
`;

const ContentBox = styled.div`
  display: inline;
`;

const Title = styled.p`
  display: block;
  cursor: pointer;
`;

const Category = styled.p`
  margin-top: 3.8em;
`;

const Create = styled.p`
  margin-top: 1.2em;
`;

const PostImage = styled.img`
  width: 8em;
  height: 8em;
`;

const WriteButton = styled.button`
  border: none;
`;

export default function Posts({
  posts, commentNumber, recommentNumber, navigate,
  changePageNumber, nextPage, previousPage, pageButtons, isPreviousPage, isNextPage,
}) {
  const handleClickPost = (id) => {
    navigate(`/post/${id}`);
  };

  const handleClickWrite = () => {
    navigate('/write');
  };

  const handleClickSchedule = () => {
    navigate('/schedule');
  };

  const handleClickPage = (event) => {
    changePageNumber(event.target.innerText - 1);
  };

  const handleClickNextPage = () => {
    nextPage();
  };

  const handleClickPreviousPage = () => {
    previousPage();
  };

  return (
    <Container>
      {Object.keys(posts).length === 0 || posts.posts === undefined ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <section>
          <div>
            <button type="button" onClick={handleClickSchedule}>경기일정</button>
            <WriteButton type="button" onClick={handleClickWrite}>글쓰기</WriteButton>
          </div>
          <HotPosts
            posts={posts}
          />
          <article>
            <List>
              {posts.posts.map((post) => (
                <Post
                  key={post.id}
                >
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
                    <Category>
                      {posts.categories.find((category) => category.id === post.categoryId).name}
                      {' '}
                      /
                      {' '}
                      {posts.users.find((user) => user.id === post.userId.userId).name}
                    </Category>
                    <Create>
                      {posts.likes.filter((like) => like.postId === post.id).length}
                      {' '}
                      {post.createdAt}
                      {' '}
                      {post.hit}
                    </Create>
                  </ContentBox>
                </Post>
              ))}
            </List>
          </article>
          <div>
            {isPreviousPage ? (
              <button type="button" onClick={handleClickPreviousPage}>이전</button>
            ) : null}
            <ul>
              {pageButtons.map((pageButton) => (
                <button
                  key={pageButton}
                  type="button"
                  onClick={(event) => handleClickPage(event)}
                >
                  {pageButton}
                </button>
              ))}
            </ul>
            {isNextPage ? (
              <button type="button" onClick={handleClickNextPage}>다음</button>
            ) : null}
          </div>
        </section>
      )}
    </Container>
  );
}
