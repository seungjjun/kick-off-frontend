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
      if (this.grade === '') {
        this.changeApplicationState('notSelect', { errorMessage: '신청 등급을 선택해주세요.' });
        return;
      }

      const data = await gradeApiService.apply(reason, this.grade, userId);

      this.changeApplicationState('success', { errorMessage: data });

      this.successMessage = data;
    } catch (e) {
      const message = e.response.data;

      this.changeApplicationState('existing', { errorMessage: message });
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

  get isSelectGrade() {
    return this.applicationState === 'notSelect';
  }

  get isApplicationSuccess() {
    return this.applicationState === 'success';
  }

  reset() {
    this.applicationState = '';
  }
}

export const gradeStore = new GradeStore();
