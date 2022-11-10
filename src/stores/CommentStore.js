import { commentApiService } from '../services/CommentApiService';

import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = [];
    this.recomments = [];

    this.recommentVisibleState = 0;

    this.page = {};
    this.commentPageNumber = 0;

    this.pageButton = [];
  }

  async fetchComments() {
    const data = await commentApiService.fetchComments();

    this.comments = data.comments;

    this.publish();
  }

  async fetchRecomments() {
    const data = await commentApiService.fetchRecomments();

    this.recomments = data.recomments;

    this.publish();
  }

  async fetchComment(postId, commentPageNumber) {
    const data = await commentApiService.fetchComment(postId, commentPageNumber);

    this.comments = data.comments;

    this.page = data.page;

    this.makePage();

    this.publish();
  }

  async fetchRecomment(postId) {
    const data = await commentApiService.fetchRecomment(postId);

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

    await this.fetchRecomment(postId);

    this.publish();
  }

  setRecommentVisibleState() {
    this.recommentVisibleState = 0;
  }

  changeRecommentVisibleState(commentId) {
    this.recommentVisibleState = commentId;

    this.publish();
  }

  changeCommentNumber(commentPageNumber) {
    this.commentPageNumber = commentPageNumber;

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

export const commentStore = new CommentStore();
