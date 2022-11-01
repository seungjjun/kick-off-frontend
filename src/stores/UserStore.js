import { userApiService } from '../services/UserApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.user = {};
  }

  async fetchUser() {
    const user = await userApiService.fetchUser();

    this.user = user;

    this.publish();
  }
}

export const userStore = new UserStore();
