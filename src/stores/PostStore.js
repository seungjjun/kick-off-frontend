import { postApiService } from '../services/PostApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.postId = 0;

    this.posts = [];
    this.post = {};

    this.categories = [];
    this.comments = [];
    this.recomments = [];
    this.likes = [];
    this.users = [];

    this.category = {};
    this.categoryId = '';

    this.imageUrl = '';

    this.page = {};
    this.pageNumber = 0;

    this.pageButton = [];
  }

  async fetchPosts(pageNumber) {
    const data = await postApiService.fetchPosts(pageNumber);

    const { posts } = data;

    this.posts = data.posts;

    this.categories = posts.categories;
    this.comments = posts.comments;
    this.recomments = posts.reComments;
    this.likes = posts.likes;
    this.users = posts.users;

    this.page = data.postPageDto;

    this.makePage();

    this.publish();
  }

  async fetchPost(postId) {
    const post = await postApiService.fetchPost(postId);

    this.post = post;
    this.category = post.category;

    this.publish();
  }

  async fetchCategoryPosts(categoryId, pageNumber) {
    const data = await postApiService.fetchCategoryPosts(categoryId, pageNumber);

    this.posts = data.categoryPosts;

    this.page = data.page;

    this.makePage();

    this.publish();
  }

  async write(title, content, categoryId, image, userId) {
    const postId = await postApiService
      .write(title, content, categoryId, image, userId);

    this.postId = postId.id;

    this.publish();
  }

  async patch(title, content, categoryId, image, postId) {
    await postApiService.patch(title, content, categoryId, image, postId);

    this.publish();
  }

  async deletePost(postId) {
    await postApiService.deletePost(postId);

    this.fetchPosts(0);

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

  changePageNumber(pageNumber) {
    this.pageNumber = pageNumber;

    this.publish();
  }

  nextPage() {
    this.pageNumber = this.page.lastPage;

    this.publish();
  }

  previousPage() {
    this.pageNumber = this.page.startPage - 11;

    this.publish();
  }

  makePage() {
    const pageButtons = [...Array(this.page.lastPage)].map((page, index) => index + 1);
    this.pageButton = pageButtons.slice(this.page.startPage - 1, this.page.lastPage);

    this.publish();
  }
}

export const postStore = new PostStore();
