import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { postStore } from '../stores/PostStore';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  gap: 0.7em;
`;

export default function Category() {
  const handleClickTotalBoard = async () => {
    await postStore.changePageNumber(0);
  };

  const handleClickCategory = () => {
    postStore.pageNumber = 0;
  };

  return (
    <div>
      <nav>
        <List>
          <li>
            <Link to="/" onClick={handleClickTotalBoard}>전체 게시판</Link>
          </li>
          <li>
            <Link to="/posts?category=2" onClick={handleClickCategory}>EPL</Link>
          </li>
          <li>
            <Link to="/posts?category=3" onClick={handleClickCategory}>LaLiga</Link>
          </li>
          <li>
            <Link to="/posts?category=4" onClick={handleClickCategory}>SerieA</Link>
          </li>
          <li>
            <Link to="/posts?category=5" onClick={handleClickCategory}>Bundesliga</Link>
          </li>
        </List>
      </nav>
    </div>
  );
}
