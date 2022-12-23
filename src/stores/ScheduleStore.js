import { scheduleApiService } from '../services/ScheduleApiService';
import Store from './Store';

export default class ScheduleStore extends Store {
  constructor() {
    super();

    this.roomId = 0;

    this.schedule = [];

    this.leagueId = 0;

    this.todayGames = [];
    this.periodGames = [];
    this.predictionsMatch = [];
  }

  async fetchTodaySchedule(today, leagueName) {
    this.changeLeagueId(leagueName);

    const data = await scheduleApiService.fetchTodaySchedule(today, this.leagueId);

    this.schedule = data;

    this.todayGames = [...this.schedule];

    this.publish();
  }

  async fetchPeriodSchedule(startYear, from, to, leagueName) {
    this.changeLeagueId(leagueName);

    const data = await scheduleApiService.fetchPeriodSchedule(startYear, from, to, this.leagueId);

    this.schedule = data;

    this.periodGames = [...this.schedule];

    this.publish();
  }

  async fetchMatchInformation(gameId) {
    const data = await scheduleApiService.fetchMatchInformation(gameId);

    this.predictionsMatch = data;

    this.publish();
  }

  changeRoomId = (roomId) => {
    this.roomId = roomId;

    this.publish();
  };

  setPeriodGames = () => {
    this.periodGames = [];

    this.publish();
  };

  changeLeagueId(leagueName) {
    if (leagueName === 'EPL') {
      this.leagueId = 39;
    }

    if (leagueName === 'LaLiga') {
      this.leagueId = 140;
    }

    if (leagueName === 'SerieA') {
      this.leagueId = 135;
    }

    if (leagueName === 'Bundesliga') {
      this.leagueId = 78;
    }

    this.publish();
  }
}

export const scheduleStore = new ScheduleStore();
