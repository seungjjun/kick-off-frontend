export default function Schedule({
  compare, gameTime, todayHomaTeam, todayAwayTeam, gameId,
}) {
  const handleClickComparison = (Id) => {
    compare(Id);
  };
  return (
    <div>
      <div>
        <section>
          <img src={todayHomaTeam.logo} alt="homeLogo" />
          {todayHomaTeam.name}
        </section>
        <section>
          vs
          <p>
            {gameTime}
          </p>
        </section>
        <section>
          <img src={todayAwayTeam.logo} alt="awayLogo" />
          {todayAwayTeam.name}
        </section>
        <button
          type="button"
          onClick={() => handleClickComparison(gameId)}
        >
          전력비교
        </button>
      </div>
    </div>
  );
}
