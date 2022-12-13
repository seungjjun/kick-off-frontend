import styled from 'styled-components';

import Comment from './Comment';

const Container = styled.div`
  padding: 2em;
  border: 1px solid #CCC;
`;

const PostContainer = styled.article`;
  margin: 0 auto;
`;

const MyPostButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 1em;

  button {
    color: #FFF;
    padding: 0.5em 1em;
    border-radius: 6px;
  }
`;

const PostUpdateButton = styled.button`
  /* background-color: #FFF; */
`;

const PostDeleteButton = styled.button`
  /* background-color: #FFF; */
`;

const PostHeader = styled.div`
  margin-block: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #CCC;
`;

const Category = styled.p`
  margin-bottom: 0.8em;
`;

const PostTitle = styled.h2`
  margin-bottom: 0.5em;
  font-size: 1.7em;
`;

const PostDate = styled.p`
  margin-top: 0.6em;
  color: #979797;
`;

const PostContent = styled.div`
  margin: auto;

  div {
    margin-top: 3em;
  }
`;

const PostImage = styled.img`
  max-width: 700px;
`;

const PostFooter = styled.div`
  display: flex;
  margin-bottom: 1em;
  padding-bottom: 1em;
  padding-top: 1em;
  border-bottom: 1px solid #CCC;

  p {
    align-self: center;
  }
`;

const LikeButton = styled.button`
  border: none;
  margin-right: 1em;
  background-color: #FFF;
  color: #000;

  :hover {
    background-color: #FFF;
  }
`;

export default function Post({
  posts, pages, comments, recomments, countLike, modifyPost, deletePost, accessToken, navigate,
}) {
  const handleClickLike = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    countLike();
  };

  const handleClcikModify = () => {
    modifyPost(posts.post.id);
  };

  const handleClickDelete = () => {
    deletePost(posts.post.id);
  };

  return (
    <Container>
      {Object.keys(posts.post).length === 0 ? (
        <p>loading</p>
      ) : (
        <PostContainer>
          <MyPostButtons>
            {posts.loginUser.identification === posts.user.identification && accessToken ? (
              <>
                <PostUpdateButton id="post-update" type="button" onClick={handleClcikModify}>수정</PostUpdateButton>
                <PostDeleteButton id="post-delete" type="button" onClick={handleClickDelete}>삭제</PostDeleteButton>
              </>
            ) : (
              null
            )}
          </MyPostButtons>
          <PostHeader>
            <Category>
              {posts.board.boardName.value}
              {' '}
              {'>'}
            </Category>
            <PostTitle>
              {posts.post.postInformation.title}
            </PostTitle>
            <div>
              <p>
                {posts.user.name}
              </p>
              <PostDate>
                {posts.post.createdAt}
                {' '}
                조회
                {' '}
                {posts.post.hit}
              </PostDate>
            </div>
          </PostHeader>
          <PostContent>
            {posts.post.postInformation.content}
            <div>
              {posts.post.imageUrl ? <PostImage src={posts.post.imageUrl} alt="uploadImage" />
                : null}
            </div>
          </PostContent>
          <PostFooter>
            <LikeButton type="button" onClick={handleClickLike}>
              좋아요
            </LikeButton>
            <p>{posts.likes.filter((like) => like.postId === posts.post.id).length}</p>
          </PostFooter>
          <Comment
            posts={posts}
            pages={pages}
            comments={comments}
            recomments={recomments}
            accessToken={accessToken}
            navigate={navigate}
          />
        </PostContainer>
      )}
    </Container>
  );
}
