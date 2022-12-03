/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class GradeApiService {
  async apply(reason, grade, userId) {
    const url = `${baseUrl}/application`;

    const { data } = await axios.post(url, {
      reason,
      grade,
      userId,
    });

    return data;
  }
}

export const gradeApiService = new GradeApiService();
