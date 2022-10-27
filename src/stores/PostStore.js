import { apiService } from '../services/ApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.posts = [];
  }

  async fetchPosts() {
    const { posts } = await apiService.fetchPosts();

    this.posts = posts;

    this.publish();
  }
}

export const postStore = new PostStore();
