import { Link } from 'react-router-dom';

import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  gap: 0.7em;
`;

export default function BoardList({ boardList, changeBoard }) {
  const handleClickBoard = () => {
    changeBoard();
  };

  return (
    <div>
      <nav>
        <List>
          {boardList.map((board) => (
            <li key={board.id}>
              <Link
                to={`/board?id=${board.id}`}
                onClick={handleClickBoard}
              >
                {board.boardName.value}
              </Link>
            </li>
          ))}
        </List>
      </nav>
    </div>
  );
}
