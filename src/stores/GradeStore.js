import { gradeApiService } from '../services/GradeApiService';

import Store from './Store';

export default class GradeStore extends Store {
  constructor() {
    super();

    this.grade = '';

    this.successMessage = '';

    this.applicationErrorMessge = '';
    this.applicationState = '';
  }

  async apply(reason, userId) {
    try {
      const data = await gradeApiService.apply(reason, this.grade, userId);

      this.successMessage = data;

      return data;
    } catch (e) {
      const { message } = e.response.data;

      this.changeApplicationState('existing', { errorMessage: message });
      return '';
    }
  }

  changeGrade(grade) {
    this.grade = grade;

    this.publish();
  }

  changeApplicationState(state, { errorMessage = '' } = {}) {
    this.applicationErrorMessge = errorMessage;
    this.applicationState = state;
    this.publish();
  }

  get isExistingUser() {
    return this.applicationState === 'existing';
  }
}

export const gradeStore = new GradeStore();
