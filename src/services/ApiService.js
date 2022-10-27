/* eslint-disable class-methods-use-this */
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export default class ApiService {
  async fetchPosts() {
    const url = `${baseUrl}`;
    const { data } = await axios.get(url);

    return data;
  }
}
