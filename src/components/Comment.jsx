/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import CommentEditForm from './CommentEditForm';

import CommentModal from './CommentModal';

import RecommentEditForm from './RecommentEditForm';

import RecommentForm from './RecommentForm';

const List = styled.ul`
  margin: 0.5em 0 0.7em 0;
  border-bottom: 1px solid #CCC;
`;

const RemoveComment = styled.p`
  margin-top: 0.6em;
  padding-bottom: .6em;
  border-bottom: 1px solid #CCC;
  color: #979797;
`;

const CommentContent = styled.p`
  margin: 0.6em 0;
`;

const CommentDate = styled.p`
  display: inline;
  color: #979797;
`;

const RecommentWriteButton = styled.button`
  margin-left: 1em;
  border: none;
  color: #979797;
  background-color: #FFF;

  :hover {
    background-color: #FFF;
  }
`;

const CommentButtons = styled.div`
  display: inline;
  margin-left: 1em;

  button {
    border: 1px solid #FFF;
    background-color: #FFF;
    color: #979797;
    margin-right: 0.3em;
  }
`;

const CommentUpdateButton = styled.button`

`;

const CommentDeleteButton = styled.button`

`;

const RecommentList = styled.li`
  margin: 0.7em 0 1em 1.2em;
`;

const PageButtonList = styled.ul`
  display: flex;
  justify-content: center;
`;

const RecommentButtons = styled.div`
  display: inline;
  margin-left: 1em;

  button {
    border: 1px solid #FFF;
    background-color: #FFF;
    color: #979797;
    margin-right: 0.3em;
  }
`;

const PageButton = styled.p`
  font-size: 1.1em;
  margin: 0 1em 1.3em 0;
  border: none;
  background-color: #FFF;
  cursor: pointer;
`;

const CommentInputForm = styled.form`
  padding: 2em 1em;
  border: 1px solid #CCC;

  label {
    color: #fff;
  }
`;

const CommentInput = styled.input`
  width: 90%;
  border: none;

  :focus {
    outline: none;
  }
`;

const CommentSubmitButton = styled.button`
  border: none;
  background-color: #FFF;
  color: #000;

  :hover {
    background-color: #FFF;
  }
`;

export default function Comment({
  posts, pages, comments, recomments, accessToken, navigate,
}) {
  const [close, setClose] = useState(false);

  const { register, handleSubmit } = useForm();

  const createComment = (data, event) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (data.content.length === 0) {
      setClose(true);
      return;
    }

    comments.submitComment(data, posts.user.id);

    event.target.reset();
  };

  const handleClickRecomment = (commentId) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    recomments.changeRecommentFormState(commentId);
  };

  const handleClickPage = (event) => {
    pages.changeCommentNumber(event.target.innerText - 1);
  };

  const handleClickNextPage = () => {
    pages.nextPage();
  };

  const handleClickPreviousPage = () => {
    pages.previousPage();
  };

  const handleClcikCommentModify = (commentId) => {
    comments.changeCommentEditState(commentId);
  };

  const handleClcikRecommentModify = (recommentId) => {
    recomments.changeRecommentEditState(recommentId);
  };

  const handleClickCommentDelete = (commentId) => {
    comments.deleteComment(commentId);
  };

  const handleClickRecommentDelete = (recommentId) => {
    recomments.deleteRecomment(recommentId);
  };

  return (
    <div>
      <ul>
        {posts.comments.length === undefined
          ? <p>Loading...</p>
          : posts.comments.map((comment) => (
            <List key={comment.id}>
              <li key={comment.id}>
                {comment.deleted ? (
                  <RemoveComment>삭제된 댓글입니다.</RemoveComment>
                ) : (
                  <>
                    {posts.users.map((user) => (
                      user.id === comment.userId ? (
                        user.name
                      ) : null
                    ))}
                    <CommentContent>
                      {comment.content}
                    </CommentContent>
                    <CommentDate>
                      {comment.commentDate}
                      <RecommentWriteButton
                        type="button"
                        onClick={() => handleClickRecomment(comment.id)}
                      >
                        답글쓰기
                      </RecommentWriteButton>
                    </CommentDate>
                    {posts.loginUser.id === comment.userId && accessToken ? (
                      <CommentButtons>
                        <CommentUpdateButton
                          id="update-comment"
                          type="button"
                          onClick={() => handleClcikCommentModify(comment.id)}
                        >
                          수정
                        </CommentUpdateButton>
                        <CommentDeleteButton
                          id="delete-comment"
                          type="button"
                          onClick={() => handleClickCommentDelete(comment.id)}
                        >
                          삭제
                        </CommentDeleteButton>
                      </CommentButtons>
                    ) : (
                      null
                    )}
                  </>
                )}
                {comments.commentEditState === comment.id ? (
                  <CommentEditForm
                    commentId={comment.id}
                    initialContent={comment.content}
                    modifyComment={comments.modifyComment}
                    changeCommentEditState={comments.changeCommentEditState}
                    close={close}
                    setClose={setClose}
                  />
                ) : (
                  null
                )}
                {comments.recommentVisibleState === comment.id ? (
                  <RecommentForm
                    changeRecommentFormState={recomments.changeRecommentFormState}
                    submitRecomment={recomments.submitRecomment}
                    commentId={comment.id}
                    userName={posts.userName}
                    content={comment.content}
                  />
                ) : null}
              </li>
              {posts.recomments.map((recomment) => (
                recomment.commentId === comment.id ? (
                  <RecommentList key={recomment.id}>
                    {posts.users.map((user) => (
                      user.id === recomment.userId ? (
                        user.name
                      ) : null
                    ))}
                    <CommentContent>
                      {recomment.content}
                    </CommentContent>
                    <CommentDate>
                      {recomment.commentDate}
                    </CommentDate>
                    {posts.loginUser.id === recomment.userId && accessToken ? (
                      <RecommentButtons>
                        <button
                          id="update-recomment"
                          type="button"
                          onClick={() => handleClcikRecommentModify(recomment.id)}
                        >
                          수정
                        </button>
                        <button
                          id="delete-recomment"
                          type="button"
                          onClick={() => handleClickRecommentDelete(recomment.id)}
                        >
                          삭제
                        </button>
                      </RecommentButtons>
                    ) : (
                      null
                    )}
                    {recomments.recommentEditState === recomment.id ? (
                      <RecommentEditForm
                        recommentId={recomment.id}
                        initialContent={recomment.content}
                        modifyRecomment={recomments.modifyRecomment}
                        changeRecommentEditState={recomments.changeRecommentEditState}
                      />
                    ) : null}
                  </RecommentList>
                ) : null
              ))}
            </List>
          ))}
      </ul>
      {pages.isPreviousPage ? (
        <button type="button" onClick={handleClickPreviousPage}>이전</button>
      ) : null}
      <PageButtonList>
        {pages.pageButtons.map((pageButton) => (
          <PageButton
            key={pageButton}
            type="button"
            onClick={(event) => handleClickPage(event)}
          >
            {pageButton}
          </PageButton>
        ))}
      </PageButtonList>
      {pages.isNextPage ? (
        <button type="button" onClick={handleClickNextPage}>다음</button>
      ) : null}
      <CommentInputForm onSubmit={handleSubmit(createComment)}>
        <label htmlFor="input-content">댓글</label>
        <CommentInput
          id="input-content"
          type="text"
          placeholder="댓글을 입력하세요"
          {...register('content')}
        />
        <CommentSubmitButton type="submit">등록</CommentSubmitButton>
        <CommentModal
          close={close}
          setClose={setClose}
        />
      </CommentInputForm>
    </div>
  );
}
