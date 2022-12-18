/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useBoardStore from '../hooks/useBoardStore';

const Container = styled.div`
`;

const HotPost = styled.li`
    margin-bottom: .7em;
    border-bottom: 1px solid #CCC;
`;

const ImageBox = styled.div`
  display: inline;
  float: left;
  cursor: pointer;
`;

const HotImageIcon = styled.div`
  width: 2em;
  height: 2em;
  background: url('https://user-images.githubusercontent.com/104769120/208288009-b8202005-c2af-4a4a-b720-5e2f604b8bca.png');
  background-size: cover;
  margin-right: .7em;
`;

const ContentBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 2.35em;

`;

const BoardName = styled.span`
  margin-right: .3em;

  cursor: pointer;
`;

const UserName = styled.span`
  margin: 0 .3em;

  cursor: pointer;
`;

const Hit = styled.span`
  margin-left: .3em;
`;

export default function HotPosts({ accessToken }) {
  const navigate = useNavigate();

  const boardStore = useBoardStore();

  const { hotPosts } = boardStore;

  const handleClickPost = (id) => {
    navigate(`/post/${id}`);
  };

  const handleClickBoard = (boardId) => {
    navigate(`/board?id=${boardId}`);
  };

  const handleClickName = (userName, userId) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    navigate(`/users?nickname=${userName}`, { state: userId });
  };

  return (
    <Container>
      <ul>
        {hotPosts.map((hotPost) => (
          <HotPost key={hotPost.posts.id}>
            <ImageBox>
              <HotImageIcon onClick={() => handleClickPost(hotPost.posts.id)} />
            </ImageBox>
            <ContentBox>
              <p onClick={() => handleClickPost(hotPost.posts.id)}>
                {hotPost.posts.postInformation.title}
                {' '}
                [
                {hotPost.commentNumber}
                ]
              </p>
              <p>
                <BoardName onClick={() => handleClickBoard(hotPost.boards.id)}>
                  {hotPost.boards.boardName}
                </BoardName>
                /
                <UserName onClick={() => handleClickName(hotPost.users.name, hotPost.users.id)}>
                  {hotPost.users.name}
                </UserName>
                /
                <Hit>
                  {hotPost.posts.hit}
                </Hit>
              </p>
            </ContentBox>
          </HotPost>
        ))}
      </ul>
    </Container>
  );
}
