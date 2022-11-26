import { userApiService } from '../services/UserApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.user = {};

    this.users = [];

    this.myInformation = {};

    this.name = '';
    this.profileImage = '';
    this.gradeName = '';

    this.componentState = '';

    this.loginState = '';
    this.loginErrorMessge = '';

    this.registrationState = '';
    this.errorMessage = '';

    this.editState = '';
    this.nicknameErrorMessage = '';
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

  async fetchMyInformation(userId) {
    const data = await userApiService.fetchMyInformation(userId);

    this.myInformation = data.myInformation;

    this.publish();
  }

  async updateProfile(userId, name, image) {
    try {
      await userApiService.updateProfile(userId, name, image);
    } catch (e) {
      const { message } = e.response.data;

      this.changeProfileState('duplication', { errorMessage: message });
    }
  }

  async register({
    name, identification, password, confirmPassword,
  }) {
    try {
      const data = await userApiService.register({
        name, identification, password, confirmPassword,
      });

      this.name = data;
    } catch (e) {
      const { message } = e.response.data;
      this.errorMessage = message;
      this.changeRegistrationState('existing', { errorMessage: message });
    }
  }

  async kakaoLogin(code) {
    try {
      const data = await userApiService.kakaoLogin(code);

      this.name = data.name;
      this.publish();

      return data.accessToken;
    } catch (error) {
      return '';
    }
  }

  async upload(formData) {
    const imageUrl = await userApiService.upload(formData);

    this.imageUrl = imageUrl;

    this.publish();
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.loginErrorMessge = errorMessage;
    this.loginState = state;
    this.publish();
  }

  changeProfileState(state, { errorMessage = '' } = {}) {
    this.nicknameErrorMessage = errorMessage;
    this.editState = state;

    this.publish();
  }

  changeComponentState(componentState) {
    this.componentState = componentState;

    this.publish();
  }

  changeRegistrationState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.registrationState = state;

    this.publish();
  }

  setComponentState() {
    this.componentState = '작성글';

    this.publish();
  }

  setEditState() {
    this.editState = '';

    this.publish();
  }

  get isLoginFail() {
    return this.loginState === 'fail';
  }

  get isExistingUserId() {
    return this.registrationState === 'existing';
  }
}

export const userStore = new UserStore();
