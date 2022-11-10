/* eslint-disable eqeqeq */
import styled from 'styled-components';

const CategoryName = styled.h2`
  font-size: 2em;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
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

const PostImage = styled.img`
  width: 8em;
  height: 8em;
`;

export default function CategoryPosts({
  posts, commentNumber, recommentNumber, likes, users, categories, navigate, categoryId,
  changePageNumber, nextPage, previousPage, pageButtons, isPreviousPage, isNextPage,
}) {
  const handleClickPost = (id) => {
    navigate(`/post/${id}`);
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
    <div>
      {Object.keys(posts).length === 0 ? (
        <p>게시글이 없습니다</p>
      ) : (
        <section>
          <CategoryName>
            {categories.find((category) => category.id == categoryId).name}
          </CategoryName>
          <article>
            <List>
              {posts.map((post) => (
                <li
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
                  <div>
                    <p
                      onClick={() => handleClickPost(post.id)}
                    >
                      {post.postInformation.title}
                      {' '}
                      [
                      {commentNumber.filter((comment) => comment === post.id).length
                + recommentNumber.filter((recomment) => recomment === post.id).length}
                      ]
                    </p>
                    <p>
                      {categories.find((category) => category.id === post.categoryId).name}
                      {' '}
                      /
                      {' '}
                      {users.find((user) => user.id === post.userId.userId).name}
                    </p>
                    <p>
                      {likes.filter((like) => like.postId === post.id).length}
                      {' '}
                      {post.createdAt}
                      {' '}
                      {post.hit}
                    </p>
                  </div>
                </li>
              ))}
            </List>
          </article>
          <div>
            {isPreviousPage ? (
              <button type="button" onClick={handleClickPreviousPage}>이전</button>
            ) : null}
            {pageButtons.map((pageButton) => (
              <button
                key={pageButton}
                type="button"
                onClick={(event) => handleClickPage(event)}
              >
                {pageButton}
              </button>
            ))}
            {isNextPage ? (
              <button type="button" onClick={handleClickNextPage}>다음</button>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
