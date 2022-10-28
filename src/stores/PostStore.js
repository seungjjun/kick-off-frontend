import { apiService } from '../services/ApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.posts = [];

    this.category = '';
  }

  async fetchPosts() {
    const { posts } = await apiService.fetchPosts();

    this.posts = posts;

    this.publish();
  }

  changeCategory(category) {
    this.category = category;

    this.publish();
  }
}

export const postStore = new PostStore();
