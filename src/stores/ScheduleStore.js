import { scheduleApiService } from '../services/ScheduleApiService';
import Store from './Store';

export default class ScheduleStore extends Store {
  constructor() {
    super();

    this.roomId = 0;

    this.schedule = [];

    this.todayGames = [];
    this.periodGames = [];
  }

  async fetchTodaySchedule(today) {
    const data = await scheduleApiService.fetchTodaySchedule(today);

    this.schedule = data.response;

    this.todayGames = [...this.schedule];

    this.publish();
  }

  async fetchPeriodSchedule(from, to) {
    const data = await scheduleApiService.fetchPeriodSchedule(from, to);

    this.schedule = data.response;

    this.periodGames = [...this.schedule];

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
