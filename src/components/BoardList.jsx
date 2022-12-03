/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const Item = styled.li`
  
`;

const LeagueBoard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6em 0;
  font-weight: bold;
  border-top: 2px solid #CCC;
  border-bottom: 1px solid #CCC;

  div {
    width: 1.6em;
    height: 1.6em;
    background-size: cover;
  }
`;

const LeagueBoardName = styled.p`
  margin-left: 0.5em;
  padding-top: 0.2em;
`;

const EplIcon = styled.div`
  
  background: url('https://user-images.githubusercontent.com/104769120/205424200-6fae76c3-9e1f-48e4-949a-f6672f3cf11c.png');
`;

const LaligaIcon = styled.div`
  background: url('https://user-images.githubusercontent.com/104769120/205424289-fd4b2646-3385-44a3-a4ff-f4e2169943f3.png');
`;

const SerieIcon = styled.div`
  background: url('https://user-images.githubusercontent.com/104769120/205424504-04f9405c-94c2-4c82-a394-74feebd6e1b6.png');
`;

const BundesligaIcon = styled.div`
  background: url('https://user-images.githubusercontent.com/104769120/205424562-d43ae2be-ed5d-4c06-8039-5097f119eec7.png');
`;

const TeamBoard = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.3em;
  padding: 0.8em 0;
`;

const TeamBoardName = styled.p`
  margin-left: 0.5em;
  padding-top: 0.2em;
`;

const PlayerBoardBox = styled.div`
  border-top: 1px solid #CCC;
  border-bottom: 1px solid #CCC;
`;

const PlayerBoard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6em 0;
  padding-left: 1.6em;
  /* border-top: 1px solid #CCC; */
`;

const PlayerBoardName = styled.p`
  margin-left: 0.5em;
  padding-top: 0.2em;
`;

const BoardIcon = styled.div`
  display: flex;
  margin-left: 0.4em;
  width: 0.8em;
  height: 1em;
  background: url('https://user-images.githubusercontent.com/104769120/205422371-0c411ede-bd3c-4c90-b3b9-d50dd2415844.png');
  background-size: cover;
`;

const LevelUpBoard = styled.p`
  border-top: 1px solid #CCC;
  padding: 1em 0;
`;

export default function BoardList({ boardList, changeBoard }) {
  const handleClickBoard = (boardName) => {
    changeBoard(boardName);
  };

  return (
    <div>
      <nav>
        <List>
          {boardList.map((board) => (
            board.parentId === null ? (
              <Item>
                <Link
                  key={board.id}
                  to={`/board?id=${board.id}`}
                  onClick={() => handleClickBoard(board.boardName.value)}
                >
                  <LeagueBoard>
                    {board.id === 2 ? (
                      <EplIcon />
                    ) : (
                      board.id === 3 ? (
                        <LaligaIcon />
                      ) : board.id === 4 ? (
                        <SerieIcon />
                      ) : board.id === 5 ? (
                        <BundesligaIcon />
                      ) : null
                    )}
                    <LeagueBoardName>
                      {board.boardName.value}
                    </LeagueBoardName>
                  </LeagueBoard>
                </Link>
                {boardList.filter((teamBoard) => teamBoard.parentId === board.id
                && teamBoard.deleted === false)
                  .map((teamBoard) => (
                    teamBoard.parentId === board.id ? (
                      <div key={teamBoard.id}>
                        <Link
                          to={`/board?id=${teamBoard.id}`}
                          onClick={() => handleClickBoard(teamBoard.boardName.value)}
                        >
                          <TeamBoard>
                            ┖
                            <BoardIcon />
                            <TeamBoardName>
                              {teamBoard.boardName.value}
                            </TeamBoardName>
                          </TeamBoard>
                        </Link>
                        <PlayerBoardBox>
                          {boardList.filter((playerBoard) => playerBoard.deleted === false)
                            .map((playerBoard) => (
                              playerBoard.parentId === teamBoard.id ? (
                                <Link
                                  to={`/board?id=${playerBoard.id}`}
                                  onClick={() => handleClickBoard(playerBoard.boardName.value)}
                                >
                                  <PlayerBoard>
                                    ┖
                                    <BoardIcon />
                                    <PlayerBoardName key={playerBoard.id}>
                                      {playerBoard.boardName.value}
                                    </PlayerBoardName>
                                  </PlayerBoard>
                                </Link>
                              ) : null
                            ))}
                        </PlayerBoardBox>
                      </div>
                    ) : null
                  ))}
              </Item>
            ) : (
              null
            )
          ))}
          <Link to="/levelup">
            <LevelUpBoard>
              등업신청 게시판
            </LevelUpBoard>
          </Link>
        </List>
      </nav>
    </div>
  );
}
