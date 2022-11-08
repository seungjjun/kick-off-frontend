import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useScheduleStore from '../hooks/useScheduleStore';

import Schedule from '../components/Schedule';

export default function SchedulePage() {
  const scheduleStore = useScheduleStore();

  const navigate = useNavigate();

  useEffect(() => {
    scheduleStore.fetchSchedule();
  }, []);

  const compare = (gameId) => {
    navigate(`/room/${gameId}`);
  };

  const { gameTime } = scheduleStore;
  const { todayHomaTeam } = scheduleStore;
  const { todayAwayTeam } = scheduleStore;
  const { gameId } = scheduleStore;

  return (
    <Schedule
      compare={compare}
      gameTime={gameTime}
      todayHomaTeam={todayHomaTeam}
      todayAwayTeam={todayAwayTeam}
      gameId={gameId}
    />
  );
}
