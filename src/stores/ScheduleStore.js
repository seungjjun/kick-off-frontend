import { scheduleApiService } from '../services/ScheduleApiService';
import Store from './Store';

export default class ScheduleStore extends Store {
  constructor() {
    super();

    this.schedule = [];
    this.gameId = 0;
    this.gameTime = 0;
    this.todayHomaTeam = '';
    this.todayAwayTeam = '';
  }

  async fetchSchedule() {
    const data = await scheduleApiService.fetchSchedule();

    this.schedule = data.response;
    this.gameId = this.schedule[157].fixture.id;
    this.gameTime = this.schedule[157].fixture.date.substring(11, 16);
    this.todayHomaTeam = this.schedule[157].teams.home;
    this.todayAwayTeam = this.schedule[157].teams.away;
  }
}

export const scheduleStore = new ScheduleStore();
