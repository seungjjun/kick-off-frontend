import styled from 'styled-components';

const Container = styled.div`
    border: 1px solid #CCC;
    height: 700px;
    overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    color: #969696;
`;

const Thead = styled.thead`
    display: flex;
    margin-top: 1em;
`;

const Tr = styled.tr`
  width: 100%;
  display: flex;
`;

const Nothing = styled.td`
    text-align: center;
    padding-top: 10em;
    font-weight: bold;
`;

const Information = styled.tr`
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
`;

const Date = styled.th`
    width: 10%;
    text-align: center;
`;

const DateValue = styled.td`
    align-self: center;
    text-align: center;
    width: 10%;
`;

const Time = styled.th`
    width: 15%;
    text-align: center;
`;

const TimeValue = styled.td`
    align-self: center;
    text-align: center;
    width: 15%;
`;

const Place = styled.th`
  width: 30%;
  text-align: center;
`;

const PlaceValue = styled.td`
  align-self: center;
  text-align: center;
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Game = styled.th`
    width: 45%;
    text-align: center;
`;

const GameValue = styled.td`
    align-self: center;
    text-align: center;
    width: 45%;
`;

const HomeLogo = styled.img`
  justify-self: center;
  width: 2em;
  height: 2em;
  grid-area: homeLogo;
`;

const AwayLogo = styled.img`
  justify-self: center;
  width: 2em;
  height: 2em;
  grid-area: awayLogo;
`;

export default function GameTable({ games }) {
  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Date>날짜</Date>
            <Time>시간</Time>
            <Place>장소</Place>
            <Game>경기</Game>
          </Tr>
        </Thead>
        <tbody>
          {games.length === 0 ? (
            <tr>
              <Nothing>경기 정보가 없습니다.</Nothing>
            </tr>
          ) : (
            <>
              {games.map((game) => (
                <Information key={game.fixture.id}>
                  <DateValue>{(game.fixture.date).toString().substring(5, 10)}</DateValue>
                  <TimeValue>
                    {game.fixture.date.toString().substring(11, 16)}
                  </TimeValue>
                  <PlaceValue>
                    {game.fixture.venue.name}
                  </PlaceValue>
                  <GameValue>
                    {game.fixture.status.short === 'FT' ? (
                      <div>
                        {game.teams.home.name}
                        <HomeLogo src={game.teams.home.logo} alt="homeLogo" />
                        {' '}
                        {game.goals.home}
                        :
                        {game.goals.away}
                        {' '}
                        <AwayLogo src={game.teams.away.logo} alt="AwayLogo" />
                        {game.teams.away.name}
                      </div>
                    ) : (
                      <div>
                        {game.teams.home.name}
                        <HomeLogo src={game.teams.home.logo} alt="homeLogo" />
                        {' '}
                        VS
                        {' '}
                        <AwayLogo src={game.teams.away.logo} alt="AwayLogo" />
                        {game.teams.away.name}
                      </div>
                    )}
                  </GameValue>
                </Information>
              ))}
            </>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
