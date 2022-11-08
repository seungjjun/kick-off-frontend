/* eslint-disable class-methods-use-this */
import axios from 'axios';

export default class ScheduleApiService {
  async fetchSchedule() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';

    const { data } = await axios.get(url, {
      params: {
        league: '39',
        season: '2022',
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
