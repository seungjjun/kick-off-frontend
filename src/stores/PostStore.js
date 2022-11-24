import { postApiService } from '../services/PostApiService';

import Store from './Store';

export default class PostStore extends Store {
  constructor() {
    super();

    this.postId = 0;

    this.post = {};

    this.user = {};

    this.board = {};

    this.imageUrl = '';
  }

  async fetchPost(postId) {
    const post = await postApiService.fetchPost(postId);

    this.post = post;
    this.board = post.board;
    this.user = post.user;

    this.publish();
  }

  async write(title, content, boardId, image, userId) {
    const postId = await postApiService
      .write(title, content, boardId, image, userId);

    this.postId = postId.id;

    this.publish();
  }

  async patch(title, content, boardId, image, postId) {
    await postApiService.patch(title, content, boardId, image, postId);

    this.publish();
  }

  async deletePost(postId) {
    await postApiService.deletePost(postId);

    this.publish();
  }

  async deleteCheckedPost(checkedPosts) {
    await postApiService.deletePosts(checkedPosts);

    this.publish();
  }

  async upload(formData) {
    const imageUrl = await postApiService.upload(formData);

    this.imageUrl = imageUrl;

    this.publish();
  }
}

export const postStore = new PostStore();
