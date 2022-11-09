import { postApiService } from '../services/PostApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.postId = 0;

    this.posts = [];
    this.post = {};

    this.category = {};

    this.categoryId = '';

    this.imageUrl = '';
  }

  async fetchPosts() {
    const data = await postApiService.fetchPosts();

    this.posts = data.posts;

    this.publish();
  }

  async fetchPost(postId) {
    const post = await postApiService.fetchPost(postId);

    this.post = post;
    this.category = post.category;

    this.publish();
  }

  async fetchCategoryPosts(categoryId) {
    const data = await postApiService.fetchCategoryPosts(categoryId);

    this.posts = data.posts;

    this.publish();
  }

  async write(title, content, categoryId, image, userId) {
    const postId = await postApiService
      .write(title, content, categoryId, image, userId);

    this.postId = postId.id;

    this.publish();
  }

  async upload(formData) {
    const imageUrl = await postApiService.upload(formData);

    this.imageUrl = imageUrl;

    this.publish();
  }

  changeCategory(categoryId) {
    this.categoryId = categoryId;

    this.publish();
  }
}

export const postStore = new PostStore();
