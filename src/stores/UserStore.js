import { userApiService } from '../services/UserApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.user = {};

    this.users = [];

    this.name = '';
    this.profileImage = '';
    this.gradeName = '';

    this.loginState = '';
    this.loginErrorMessge = '';
  }

  async fetchUsers() {
    const data = await userApiService.fetchUsers();

    this.users = data.users;

    this.publish();
  }

  async fetchUser() {
    const user = await userApiService.fetchUser();

    this.user = user;

    this.publish();
  }

  async login({ userId, password }) {
    try {
      const data = await userApiService.login({ userId, password });

      this.name = data.name;
      this.profileImage = data.profileImage;
      this.gradeName = data.gradeName;

      return data.accessToken;
    } catch (e) {
      const { message } = e.response.data;

      this.changeLoginState('fail', { errorMessage: message });
      return '';
    }
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.loginErrorMessge = errorMessage;
    this.loginState = state;
    this.publish();
  }

  get isLoginFail() {
    return this.loginState === 'fail';
  }
}

export const userStore = new UserStore();
