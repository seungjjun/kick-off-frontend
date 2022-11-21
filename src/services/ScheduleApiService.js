/* eslint-disable class-methods-use-this */
import axios from 'axios';

export default class ScheduleApiService {
  async fetchTodaySchedule(today) {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';

    const { data } = await axios.get(url, {
      params: {
        league: '39',
        season: '2022',
        date: `2022-${today}`,
        timezone: 'Asia/Seoul',
      },

      headers: {
        'X-RapidAPI-Key': '75a7932f08msh123a43a72898729p10fec8jsnba0f6b42d9d9',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    });

    return data;
  }

  async fetchPeriodSchedule(from, to) {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';

    const { data } = await axios.get(url, {
      params: {
        league: '39',
        season: '2022',
        from,
        to,
        timezone: 'Asia/Seoul',
      },

      headers: {
        'X-RapidAPI-Key': '75a7932f08msh123a43a72898729p10fec8jsnba0f6b42d9d9',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    });

    console.log(data);

    return data;
  }
}

export const scheduleApiService = new ScheduleApiService();
