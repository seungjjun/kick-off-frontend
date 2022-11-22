import { scheduleApiService } from '../services/ScheduleApiService';
import Store from './Store';

export default class ScheduleStore extends Store {
  constructor() {
    super();

    this.roomId = 0;

    this.schedule = [];

    this.todayGames = [];
    this.periodGames = [];
    this.predictionsMatch = [];
  }

  async fetchTodaySchedule(today) {
    const data = await scheduleApiService.fetchTodaySchedule(today);

    this.schedule = data.response;

    this.todayGames = [...this.schedule];

    this.publish();
  }

  async fetchPeriodSchedule(startYear, from, to) {
    const data = await scheduleApiService.fetchPeriodSchedule(startYear, from, to);

    this.schedule = data.response;

    this.periodGames = [...this.schedule];

    this.publish();
  }

  async fetchMatchInformation(gameId) {
    const data = await scheduleApiService.fetchMatchInformation(gameId);

    this.predictionsMatch = data.response;

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
}

export const scheduleStore = new ScheduleStore();
