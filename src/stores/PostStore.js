import { postApiService } from '../services/PostApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.postId = 0;

    this.posts = [];
    this.post = {};

    this.category = {};
    this.author = {};
    this.likes = {};

    this.categoryId = '';
    this.imageUrl = '';
  }

  async fetchPosts() {
    const { posts } = await postApiService.fetchPosts();

    this.posts = [...posts];

    this.publish();
  }

  async fetchPost(postId) {
    const post = await postApiService.fetchPost(postId);

    this.post = post;
    this.category = post.category;
    this.author = post.user;
    this.likes = post.likes;

    this.publish();
  }

  async write(title, content, categoryId, image, userId) {
    const post = await postApiService.write(title, content, categoryId, image, userId);

    this.post = post;
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
