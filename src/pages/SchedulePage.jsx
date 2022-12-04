import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import useScheduleStore from '../hooks/useScheduleStore';

import Schedule from '../components/Schedule';

export default function SchedulePage({ accessToken }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const todayDate = new Date();

  const scheduleStore = useScheduleStore();

  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname;

  const leagueName = path.split('/')[2];

  const fillZero = (date) => (date.toString().length === 1
    ? date.toString().padStart(2, '0')
    : date.toString());

  const todayDay = fillZero(todayDate.getDate() + 3);
  const todayMonth = fillZero(todayDate.getMonth());
  const today = `${todayMonth}` + '-' + `${todayDay}`;

  useEffect(() => {
    scheduleStore.fetchTodaySchedule(today, leagueName);
    scheduleStore.setPeriodGames();
  }, []);

  const checkScheduleByPeriod = () => {
    const startYear = startDate.getFullYear();
    const startMonth = fillZero(startDate.getMonth() + 1);
    const startDay = fillZero(startDate.getDate());

    const endYear = endDate.getFullYear();
    const endMonth = fillZero(endDate.getMonth() + 1);
    const endDay = fillZero(endDate.getDate());

    const from = `${startYear}-${startMonth}-${startDay}`;
    const to = `${endYear}-${endMonth}-${endDay}`;

    scheduleStore.fetchPeriodSchedule(startYear, from, to, leagueName);
  };

  const compare = async (gameId) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    scheduleStore.changeRoomId(gameId);

    scheduleStore.fetchMatchInformation(gameId);

    navigate(`/room/${gameId}`);
  };

  const games = {
    todayGames: scheduleStore.todayGames,
    periodGames: scheduleStore.periodGames,
  };

  const setPeriod = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };

  return (
    <Schedule
      compare={compare}
      games={games}
      checkScheduleByPeriod={checkScheduleByPeriod}
      setPeriod={setPeriod}
      leagueName={leagueName}
    />
  );
}
