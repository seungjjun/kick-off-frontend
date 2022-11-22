import styled from 'styled-components';

const PredictionBox = styled.div`
  width: 70%;
`;

const MatchInformation = styled.div`
  border: 1px solid #CCC;
  margin-bottom: 2em;
`;

const ComparisonBox = styled.div`
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeLogo = styled.img`
  width: 3em;
  height: 3em;
`;

export default function Comparison({ predictions }) {
  if (Object.keys(predictions).length === 0) {
    return (
      <p>로딩중입니다..</p>
    );
  }

  const recentMatchs = predictions[0].h2h;

  const homeRecentMatchResult = (predictions[0].teams.home.league.form).slice(-5);
  const awayRecentMatchResult = (predictions[0].teams.away.league.form).slice(-5)
    .split('').reverse().join('');

  return (
    <PredictionBox>
      <MatchInformation>
        <img src={predictions[0].teams.home.logo} alt="homeLogo" />
        <img src={predictions[0].teams.away.logo} alt="awayLogo" />
      </MatchInformation>
      <ComparisonBox>
        <div>
          <p>
            {predictions[0].teams.home.name}
            {' '}
            VS
            {' '}
            {predictions[0].teams.away.name}
          </p>
          <p>
            {predictions[0].teams.home.league.fixtures.wins.total}
            승
            {predictions[0].teams.home.league.fixtures.draws.total}
            무
            {predictions[0].teams.home.league.fixtures.loses.total}
            패
            {' '}
            {predictions[0].teams.away.league.fixtures.wins.total}
            승
            {predictions[0].teams.away.league.fixtures.draws.total}
            무
            {predictions[0].teams.away.league.fixtures.loses.total}
            패
          </p>
          <p>
            {homeRecentMatchResult}
            {' '}
            최근경기
            {' '}
            {awayRecentMatchResult}
          </p>
          <p>
            {predictions[0].teams.home.league.goals.for.average.total}
            평균득점
            {predictions[0].teams.away.league.goals.for.average.total}
          </p>
          <p>
            {predictions[0].teams.home.league.goals.against.average.total}
            평균실점
            {predictions[0].teams.away.league.goals.against.average.total}
          </p>
        </div>
        <div>
          <p>최근 양팀 맞대결</p>
          <ul>
            {recentMatchs.map((match, index) => (
              index < 3 ? (
                <li key={match.fixture.id}>
                  <span>
                    {predictions[0].teams.home.name}
                    <HomeLogo src={predictions[0].teams.home.logo} alt="homeLogo" />
                  </span>
                  <span>
                    {match.goals.home}
                    {' '}
                    {(match.fixture.date).substring(0, 10)}
                    {' '}
                    {match.goals.away}
                  </span>
                  <span>
                    <HomeLogo src={predictions[0].teams.away.logo} alt="awayLogo" />
                    {predictions[0].teams.away.name}
                  </span>
                </li>
              ) : (
                null
              )
            ))}
          </ul>
        </div>
        <div>
          <p>득점 시간대</p>
          <ul>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['0-15'].percentage === null ? (
                <span>0%</span>
              ) : (
                <span>{predictions[0].teams.home.league.goals.for.minute['0-15'].percentage}</span>
              )}
              {' '}
              <span>0 ~ 15</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['0-15'].percentage}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['0-15'].percentage}
              {' '}
              <span>16 ~ 30</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['16-30'].percentage}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['16-30'].percentage}
              {' '}
              <span>31 ~ 45</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['31-45'].percentage}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['31-45'].percentage}
              {' '}
              <span>46 ~ 60</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['46-60'].percentage}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['46-60'].percentage}
              {' '}
              <span>61 ~ 75</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['61-75'].percentage}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['61-75'].percentage}
              {' '}
              <span>76 ~ 90</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['76-90'].percentage}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['91-105'].percentage === null ? (
                <span>0%</span>
              ) : (
                <span>{predictions[0].teams.home.league.goals.for.minute['91-105'].percentage}</span>
              )}
              {' '}
              <span>91 ~ 105</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['91-105'].percentage === null ? (
                <span>0%</span>
              ) : (
                <span>{predictions[0].teams.away.league.goals.for.minute['91-105'].percentage}</span>
              )}
            </li>
            <li>
              {predictions[0].teams.home.league.goals.for.minute['106-120'].percentage === null ? (
                <span>0%</span>
              ) : (
                <span>{predictions[0].teams.home.league.goals.for.minute['106-120'].percentage}</span>
              )}
              {' '}
              <span>106 ~ 120</span>
              {' '}
              {predictions[0].teams.away.league.goals.for.minute['106-120'].percentage === null ? (
                <span>0%</span>
              ) : (
                <span>{predictions[0].teams.away.league.goals.for.minute['106-120'].percentage}</span>
              )}
            </li>
          </ul>
        </div>
      </ComparisonBox>
    </PredictionBox>
  );
}
