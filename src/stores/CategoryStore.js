import { categoryApiService } from '../services/CategoryApiService';

import Store from './Store';

export default class CategoryStore extends Store {
  constructor() {
    super();

    this.categories = [];
  }

  async fetchCategory() {
    const data = await categoryApiService.fetchCategory();

    this.categories = data.categories;
  }
}

export const categoryStore = new CategoryStore();
