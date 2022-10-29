import { apiService } from '../services/ApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.postId = 0;

    this.posts = [];
    this.post = {};

    this.category = '';
  }

  async fetchPosts() {
    const { posts } = await apiService.fetchPosts();

    this.posts = posts;

    this.publish();
  }

  async fetchPost(postId) {
    const post = await apiService.fetchPost(postId);

    this.post = post;

    this.publish();
  }

  async write(title, content, category) {
    const post = await apiService.write(title, content, category);

    this.postId = post.id;
    this.category = category;
    this.publish();
  }

  changeCategory(category) {
    this.category = category;

    this.publish();
  }
}

export const postStore = new PostStore();
