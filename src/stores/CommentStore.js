import { commentApiService } from '../services/CommentApiService';

import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = {};
    this.recomments = {};

    this.recommentVisibleState = 0;
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

  async createRecomment(content, commentId, postId, userId) {
    await commentApiService.createRecomment(content, commentId, postId, userId);

    await this.fetchComment(postId);

    this.publish();
  }

  setRecommentVisibleState() {
    this.recommentVisibleState = 0;
  }

  changeRecommentVisibleState(commentId) {
    this.recommentVisibleState = commentId;

    this.publish();
  }
}

export const commentStore = new CommentStore();
