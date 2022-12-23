/* eslint-disable class-methods-use-this */
import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ScheduleApiService {
  async fetchTodaySchedule(today, leagueId) {
    const url = `${baseUrl}/schedule/today/${leagueId}`;

    const { data } = await axios.get(url, {
      params: {
        today,
      },
    });

    return data.response;
  }

  async fetchPeriodSchedule(startYear, from, to, leagueId) {
    const url = `${baseUrl}/schedule/period/${leagueId}`;

    const { data } = await axios.get(url, {
      params: {
        startYear,
        from,
        to,
      },
    });

    return data.response;
  }

  async fetchMatchInformation(gameId) {
    const url = `${baseUrl}/schedule/predictions/${gameId}`;

    const { data } = await axios.get(url);

    return data.response;
  }
}

export const scheduleApiService = new ScheduleApiService();
