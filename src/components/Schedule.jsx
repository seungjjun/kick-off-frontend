import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { ko } from 'date-fns/esm/locale';

import styled from 'styled-components';

import GameTable from './GameTable';

const CalendarBox = styled.div`
  display: flex;
  margin: 2em 0;
  justify-content: center;
`;

const LeagueName = styled.h2`
  font-size: 1.6em;
  font-weight: bold;
  margin-bottom: .5em;
`;

const Inquiry = styled.p`
  align-self: center;
  margin-right: 1em;
`;

const StartDate = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  align-self: center;
`;

const EndDate = styled.div`
    align-self: center;
    margin-right: 2em;
`;

const InquiryButton = styled.button`
  padding: 0.4em 1em;
  border: 1px solid #CCC;
  border-radius: 1em;
  background-color: #fff;
  color: #000;
`;

const TodayMatch = styled.div`
  padding: 1em;
  border: 1px solid #000;
`;

const Nothing = styled.p`
  margin-top: 0.3em;
  font-weight: bold;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 1em;
  overflow-x: auto;
`;

const Item = styled.li`
  display: list-item;
  margin-top: 1em;
  width: 16em;
  height: 10em;
`;

const GameBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr 1fr;
  grid-template-rows: 1fr 0.5fr 0.9fr 1fr;
  grid-template-areas:
  "homeLogo versus awayLogo"
  "homeLogo time awayLogo"
  "homeName . awayName"
  "comparison comparison comparison";
`;

const HomeLogo = styled.img`
  justify-self: center;
  width: 4.2em;
  height: 4.2em;
  grid-area: homeLogo;
`;

const AwayLogo = styled.img`
  justify-self: center;
  width: 4.2em;
  height: 4.2em;
  grid-area: awayLogo;
`;

const HomeTeamName = styled.p`
  text-align: center;
  grid-area: homeName;
`;

const AwayTeamName = styled.p`
  text-align: center;
  grid-area: awayName;
`;

const Versus = styled.p`
  align-self: center;
  text-align: center;
  font-size: 2em;
  font-weight: 500;
  color: #CCC;
  grid-area: versus;
`;

const Time = styled.div`
  padding: 0.3em;
  border-radius: 1em;
  border: 1px solid #CCC;
  align-self: center;
  text-align: center;
  grid-area: time;
`;

const Comparison = styled.button`
  width: 16em;
  height: 2.2em;
  align-self: center;
  justify-self: center;
  border: 1px solid #ccc;
  background-color: #000;
  font-weight: bold;
  grid-area: comparison;
`;

export default function Schedule({
  compare, games, checkScheduleByPeriod, setPeriod, leagueName,
}) {
  const handleClickComparison = (Id) => {
    compare(Id);
  };

  const handleClickInquiry = () => {
    checkScheduleByPeriod();
  };

  return (
    <div>
      <LeagueName>{leagueName}</LeagueName>
      <TodayMatch>
        <List>
          {games.todayGames.length === 0 ? (
            <Nothing>?????? ???????????? ????????? ????????????.</Nothing>
          ) : (
            <>
              {games.todayGames.map((game) => (
                <Item key={game.fixture.id}>
                  <GameBox>
                    <HomeLogo src={game.teams.home.logo} alt="homeLogo" />
                    <HomeTeamName>
                      {game.teams.home.name}
                    </HomeTeamName>
                    <Versus>
                      VS
                    </Versus>
                    <AwayLogo src={game.teams.away.logo} alt="awayLogo" />
                    <AwayTeamName>
                      {game.teams.away.name}
                    </AwayTeamName>
                    <Time>
                      {game.fixture.date.toString().substring(11, 16)}
                    </Time>
                    <Comparison
                      type="button"
                      onClick={() => handleClickComparison(game.fixture.id)}
                    >
                      ????????????
                    </Comparison>
                  </GameBox>
                </Item>
              ))}
            </>
          )}
        </List>
      </TodayMatch>
      <CalendarBox>
        <Inquiry>?????? ??????</Inquiry>
        <StartDate>
          <DatePicker
            locale={ko}
            dateFormat="yyyy??? MM??? dd???"
            selected={setPeriod.startDate}
            onChange={(date) => setPeriod.setStartDate(date)}
            selectsStart
            startDate={setPeriod.startDate}
            endDate={setPeriod.endDate}
          />
        </StartDate>
        <EndDate>
          <DatePicker
            locale={ko}
            dateFormat="yyyy??? MM??? dd???"
            selected={setPeriod.endDate}
            onChange={(date) => setPeriod.setEndDate(date)}
            selectsEnd
            startDate={setPeriod.startDate}
            endDate={setPeriod.endDate}
          />
        </EndDate>
        <InquiryButton type="button" onClick={handleClickInquiry}>??????</InquiryButton>
      </CalendarBox>
      <GameTable
        games={games.periodGames}
      />
    </div>
  );
}
