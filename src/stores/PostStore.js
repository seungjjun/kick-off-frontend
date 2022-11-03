import { postApiService } from '../services/PostApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.postId = 0;

    this.posts = [];
    this.post = {};

    this.comments = [];
    this.recomments = [];

    this.likes = [];

    this.users = [];
    this.user = {};

    this.categories = [];
    this.category = {};

    this.categoryId = '';

    this.imageUrl = '';
  }

  async fetchPosts() {
    const data = await postApiService.fetchPosts();

    this.posts = data.posts;
    this.comments = data.comments;
    this.recomments = data.recomments;
    this.likes = data.likes;
    this.users = data.users;
    this.categories = data.categories;

    this.publish();
  }

  async fetchPost(postId) {
    const post = await postApiService.fetchPost(postId);

    this.post = post;
    this.likes = post.likes;
    this.category = post.category;
    this.user = post.user;

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

  async countLike(postId, userId) {
    await postApiService.like(postId, userId);

    await this.fetchPost(postId);

    this.publish();
  }

  changeCategory(categoryId) {
    this.categoryId = categoryId;

    this.publish();
  }
}

export const postStore = new PostStore();
