/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

import useScheduleStore from '../hooks/useScheduleStore';

const PredictionBox = styled.div`
  width: 70%;
`;

const MatchInformation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.5fr 0.6fr 1fr;
  grid-template-areas:
  "homeLogo status awayLogo"
  "homeLogo time awayLogo"
  "homeLogo stadium awayLogo"
  "homeName . awayName";
  margin-bottom: 2em;
  padding-top: 1em;
  border: 1px solid #CCC;
  text-align: center;
  align-items: center;
  
  img {
    margin: auto;
  }
`;

const HomeLogoImage = styled.img`
  grid-area: homeLogo;
`;

const AwayLogoImage = styled.img`
  grid-area: awayLogo;
`;

const HomeName = styled.p`
  grid-area: homeName;
`;

const AwayName = styled.p`
  grid-area: awayName;
`;

const Stadium = styled.p`
  grid-area: stadium;
`;

const Time = styled.p`
  grid-area: time;
`;

const Status = styled.p`
  grid-area: status;
`;

const ComparisonBox = styled.div`
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 550px;
`;

const TeamName = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 1fr 0.3fr 1fr;
  grid-template-rows: 2.5fr 1fr;
  grid-template-areas:
  "homeName versus awayName"
  "homeResult versus awayResult";

  span {
    font-size: 1.4em;
    text-align: center;
    color: #CCC;
  }
`;

const HomeTeamName = styled.p`
  grid-area: homeName;
  text-align: end;
`;

const HomeResult = styled.p`
  grid-area: homeResult;
  text-align: end;
`;

const AwayTeamName = styled.p`
  grid-area: awayName;
  text-align: start;
`;

const AwayResult = styled.p`
  grid-area: awayResult;
  text-align: start;
`;

const RecentMatchResult = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr 1fr;
  grid-template-rows: 1.7fr 1.7fr 1fr;
  grid-template-areas:
  "homeResult recentMatch awayResult"
  "homeGoals GF awayGoals"
  "homeConceded GA awayConceded";
  width: 100%;
  margin-top: 1em;

  span {
    text-align: center;
    grid-area: recentMatch;
  }
`;

const HomeIcon = styled.div`
  display: flex;
  justify-content: end;
  grid-area: homeResult;
`;

const AwayIcon = styled.div`
  display: flex;
  grid-area: awayResult;
`;

const WinIcon = styled.div`
  width: 1em;
  height: 1em;
  background-image: url('https://user-images.githubusercontent.com/104769120/206151307-08e38ca3-5529-4c2b-99de-c494a52f4cc4.png');
  background-size: cover;
`;

const DrawIcon = styled.div`
  width: 1em;
  height: 1em;
  background-image: url('https://user-images.githubusercontent.com/104769120/206155737-52b2646c-1b06-459f-a371-ae44c164250d.png');
  background-size: cover;
`;

const LoseIcon = styled.div`
  width: 1em;
  height: 1em;
  background-image: url('https://user-images.githubusercontent.com/104769120/206158089-4ec4d5a9-8b70-4788-ba1b-3e0a1f7ec5c0.png');
  background-size: cover;
`;

const AverageGoals = styled.p`
  text-align: center;
  grid-area: GF;
  color: #CCC;
`;

const HomeGoals = styled.p`
  grid-area: homeGoals;
  text-align: end;
  
`;

const AwayGoals = styled.p`
  grid-area: awayGoals;
`;

const AverageConceded = styled.p`
  text-align: center;
  grid-area: GA;
  color: #CCC;
`;

const HomeConceded = styled.p`
  text-align: end;
  grid-area: homeConceded;
`;

const AwayConceded = styled.p`
  grid-area: awayConceded;
`;

const RecentMatch = styled.div`
  width: 100%;
  margin-top: 1em;
`;

const RecentMatchTitle = styled.p`
  text-align: center;
  margin-block: .5em;
  font-weight: 600;
`;

const RecentMatchList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
  "homeName";
`;

const RecentMatchItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.3fr 0.7fr 0.3fr 0.3fr 1fr;
  grid-template-areas:
  "homeName homeLogo homeGoals matchDate awayGoals awayLogo awayName";
  margin-top: .7em;
  text-align: center;
  align-items: center;
  width: 100%;

  p:nth-child(1) { 
    text-align: end;
  }

  p:last-child {
    text-align: start;
  }
`;

const RecentMatchHomeName = styled.p`
  grid-area: homeName;
`;

const RecentHomeGoals = styled.p`
  grid-area: homeGoals;
`;

const RecentAwayGoals = styled.p`
  grid-area: awayGoals;
`;

const HomeLogo = styled.img`
  width: 1.5em;
  height: 1.5em;
  grid-area: homeLogo;
`;

const AwayLogo = styled.img`
  width: 1.5em;
  height: 1.5em;
  grid-area: awayLogo;
`;

const RecentMatchAwayName = styled.p`
  grid-area: awayName;
`;

const RecentMatchDate = styled.p`
  color: #CCC;
  grid-area: matchDate;
`;

const AverageGoalsTime = styled.div`
  margin-top: 1.4em;
  width: 100%;
  
  p:first-child {
    margin-bottom: .4em;
    text-align: center;
    font-weight: 600;
  }
`;

const GoalTimeList = styled.ul`
  display: flex;
  flex-direction: column;
  
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
  "homePercentage time awayPercentage";
`;

const HomePercentage = styled.p`
  grid-area: homePercentage;
`;

const AwayPercentage = styled.p`
  text-align: center;
  grid-area: awayPercentage;
`;

const GoalTime = styled.p`
  text-align: center;
  grid-area: time;
`;

export default function Comparison({ predictions }) {
  const scheduleStore = useScheduleStore();

  const todayGames = [...scheduleStore.todayGames];

  if (Object.keys(predictions).length === 0) {
    return (
      <p>로딩중입니다..</p>
    );
  }

  const recentMatchs = predictions[0].h2h;

  const homeRecentMatchResult = [...(predictions[0].teams.home.league.form).slice(-5)];
  const awayRecentMatchResult = [...(predictions[0].teams.away.league.form).slice(-5)
    .split('').reverse().join('')];

  return (
    <PredictionBox>
      <MatchInformation>
        <HomeLogoImage src={predictions[0].teams.home.logo} alt="homeLogo" />
        <HomeName>{predictions[0].teams.home.name}</HomeName>
        <Status>{todayGames[0].fixture.status.long}</Status>
        <Time>{todayGames[0].fixture.date.substring(0, 10)}</Time>
        <Stadium>{todayGames[0].fixture.venue.name}</Stadium>
        <AwayLogoImage src={predictions[0].teams.away.logo} alt="awayLogo" />
        <AwayName>{predictions[0].teams.away.name}</AwayName>
      </MatchInformation>
      <ComparisonBox>
        <TeamName>
          <HomeTeamName>
            {predictions[0].teams.home.name}
          </HomeTeamName>
          <span>
            VS
          </span>
          <AwayTeamName>
            {predictions[0].teams.away.name}
          </AwayTeamName>
          <HomeResult>
            {predictions[0].teams.home.league.fixtures.wins.total}
            승
            {' '}
            {predictions[0].teams.home.league.fixtures.draws.total}
            무
            {' '}
            {predictions[0].teams.home.league.fixtures.loses.total}
            패
          </HomeResult>
          <AwayResult>
            {predictions[0].teams.away.league.fixtures.wins.total}
            승
            {' '}
            {predictions[0].teams.away.league.fixtures.draws.total}
            무
            {' '}
            {predictions[0].teams.away.league.fixtures.loses.total}
            패
          </AwayResult>
        </TeamName>
        <RecentMatchResult>
          <HomeIcon>
            {homeRecentMatchResult.map((result) => (
              result === 'W' ? (
                <WinIcon />
              )
                : result === 'D' ? (
                  <DrawIcon />
                ) : (
                  <LoseIcon />
                )
            ))}
          </HomeIcon>
          <span>
            최근경기
          </span>
          <AwayIcon>
            {awayRecentMatchResult.map((result) => (
              result === 'W' ? (
                <WinIcon />
              )
                : result === 'D' ? (
                  <DrawIcon />
                ) : (
                  <LoseIcon />
                )
            ))}
          </AwayIcon>
          <HomeGoals>
            {predictions[0].teams.home.league.goals.for.average.total}
          </HomeGoals>
          <AverageGoals>
            평균득점
          </AverageGoals>
          <AwayGoals>
            {predictions[0].teams.away.league.goals.for.average.total}
          </AwayGoals>
          <HomeConceded>
            {predictions[0].teams.home.league.goals.against.average.total}
          </HomeConceded>
          <AverageConceded>
            평균실점
          </AverageConceded>
          <AwayConceded>
            {predictions[0].teams.away.league.goals.against.average.total}
          </AwayConceded>
        </RecentMatchResult>
        <RecentMatch>
          <RecentMatchTitle>
            최근 양팀 맞대결
          </RecentMatchTitle>
          <RecentMatchList>
            {recentMatchs.map((match, index) => (
              index < 3 ? (
                <RecentMatchItem key={match.fixture.id}>
                  <RecentMatchHomeName>
                    {predictions[0].teams.home.name}
                  </RecentMatchHomeName>
                  <HomeLogo src={predictions[0].teams.home.logo} alt="homeLogo" />
                  <RecentHomeGoals>
                    {match.goals.home}
                  </RecentHomeGoals>
                  <RecentMatchDate>
                    {(match.fixture.date).substring(0, 10)}
                  </RecentMatchDate>
                  <RecentAwayGoals>
                    {match.goals.away}
                  </RecentAwayGoals>
                  <div>
                    <AwayLogo src={predictions[0].teams.away.logo} alt="awayLogo" />
                  </div>
                  <RecentMatchAwayName>
                    {predictions[0].teams.away.name}
                  </RecentMatchAwayName>
                </RecentMatchItem>
              ) : (
                null
              )
            ))}
          </RecentMatchList>
        </RecentMatch>
        <AverageGoalsTime>
          <p>득점 시간대</p>
          <GoalTimeList>
            <Item>
              {predictions[0].teams.home.league.goals.for.minute['0-15'].percentage === null ? (
                <HomePercentage>0%</HomePercentage>
              ) : (
                <HomePercentage>
                  {predictions[0].teams.home.league.goals.for.minute['0-15'].percentage}
                </HomePercentage>
              )}
              <GoalTime>0 ~ 15</GoalTime>
              <AwayPercentage>
                {predictions[0].teams.away.league.goals.for.minute['0-15'].percentage}
              </AwayPercentage>
            </Item>
            <Item>
              <HomePercentage>
                {predictions[0].teams.home.league.goals.for.minute['0-15'].percentage}
              </HomePercentage>
              <GoalTime>16 ~ 30</GoalTime>
              <AwayPercentage>
                {predictions[0].teams.away.league.goals.for.minute['16-30'].percentage}
              </AwayPercentage>
            </Item>
            <Item>
              <HomePercentage>
                {predictions[0].teams.home.league.goals.for.minute['16-30'].percentage}
              </HomePercentage>
              <GoalTime>31 ~ 45</GoalTime>
              <AwayPercentage>
                {predictions[0].teams.away.league.goals.for.minute['31-45'].percentage}
              </AwayPercentage>
            </Item>
            <Item>
              <HomePercentage>
                {predictions[0].teams.home.league.goals.for.minute['31-45'].percentage}
              </HomePercentage>
              <GoalTime>46 ~ 60</GoalTime>
              <AwayPercentage>
                {predictions[0].teams.away.league.goals.for.minute['46-60'].percentage}
              </AwayPercentage>
            </Item>
            <Item>
              <HomePercentage>
                {predictions[0].teams.home.league.goals.for.minute['46-60'].percentage}
              </HomePercentage>
              <GoalTime>61 ~ 75</GoalTime>
              <AwayPercentage>
                {predictions[0].teams.away.league.goals.for.minute['61-75'].percentage}
              </AwayPercentage>
            </Item>
            <Item>
              <HomePercentage>
                {predictions[0].teams.home.league.goals.for.minute['61-75'].percentage}
              </HomePercentage>
              <GoalTime>76 ~ 90</GoalTime>
              <AwayPercentage>
                {predictions[0].teams.away.league.goals.for.minute['76-90'].percentage}
              </AwayPercentage>
            </Item>
            <Item>
              {predictions[0].teams.home.league.goals.for.minute['91-105'].percentage === null ? (
                <HomePercentage>0%</HomePercentage>
              ) : (
                <HomePercentage>{predictions[0].teams.home.league.goals.for.minute['91-105'].percentage}</HomePercentage>
              )}
              <GoalTime>91 ~ 105</GoalTime>
              {predictions[0].teams.away.league.goals.for.minute['91-105'].percentage === null ? (
                <AwayPercentage>0%</AwayPercentage>
              ) : (
                <AwayPercentage>{predictions[0].teams.away.league.goals.for.minute['91-105'].percentage}</AwayPercentage>
              )}
            </Item>
            <Item>
              {predictions[0].teams.home.league.goals.for.minute['106-120'].percentage === null ? (
                <HomePercentage>0%</HomePercentage>
              ) : (
                <HomePercentage>{predictions[0].teams.home.league.goals.for.minute['106-120'].percentage}</HomePercentage>
              )}
              {' '}
              <GoalTime>106 ~ 120</GoalTime>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['106-120'].percentage === null ? (
                <AwayPercentage>0%</AwayPercentage>
              ) : (
                <AwayPercentage>{predictions[0].teams.away.league.goals.for.minute['106-120'].percentage}</AwayPercentage>
              )}
            </Item>
          </GoalTimeList>
        </AverageGoalsTime>
      </ComparisonBox>
    </PredictionBox>
  );
}
