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

    this.scheduleState = '';
    this.scheduleErrorMessge = '';
  }

  async fetchTodaySchedule(today, leagueName, accessToken) {
    try {
      this.changeLeagueId(leagueName);

      const data = await scheduleApiService.fetchTodaySchedule(today, this.leagueId, accessToken);

      this.schedule = data;

      this.todayGames = [...this.schedule];
    } catch (e) {
      const { message } = e.response.data;

      this.changeScheduleState('exceed', { errorMessage: message });
    }
  }

  async fetchPeriodSchedule(startYear, from, to, leagueName, accessToken) {
    try {
      this.changeLeagueId(leagueName);

      const data = await scheduleApiService
        .fetchPeriodSchedule(startYear, from, to, this.leagueId, accessToken);

      this.schedule = data;

      this.periodGames = [...this.schedule];
    } catch (e) {
      const { message } = e.response.data;

      this.changeScheduleState('exceed', { errorMessage: message });
    }
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

  changeScheduleState(state, { errorMessage = '' } = {}) {
    this.scheduleErrorMessge = errorMessage;

    this.scheduleState = state;

    this.publish();
  }

  get isExceed() {
    return this.scheduleState === 'exceed';
  }
}

export const scheduleStore = new ScheduleStore();
