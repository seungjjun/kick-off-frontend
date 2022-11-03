import { commentApiService } from '../services/CommentApiService';

import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = {};
    this.recomments = {};
  }

  async fetchComment(postId) {
    const data = await commentApiService.fetchComment(postId);

    this.comments = data.comments;
    this.recomments = data.recomments;

    this.publish();
  }

  async createComment(content, postId, userId) {
    await commentApiService.createComment(content, postId, userId);

    await this.fetchComment(postId);

    this.publish();
  }
}

export const commentStore = new CommentStore();
