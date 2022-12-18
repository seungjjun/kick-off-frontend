import { commentApiService } from '../services/CommentApiService';

import Store from './Store';

export default class CommentStore extends Store {
  constructor() {
    super();

    this.comments = [];
    this.recomments = [];

    this.recommentVisibleState = 0;
    this.commentEditState = 0;

    this.recommentEditState = 0;

    this.page = {};
    this.commentPageNumber = 0;

    this.errorMessage = '';
    this.createCommentState = '';
    this.createRecommentState = '';

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

  async createComment(content, postId, userId, receiverId, accessToken) {
    try {
      await commentApiService.createComment(content, postId, userId, receiverId, accessToken);

      await this.fetchComment(postId);
    } catch (e) {
      const { message } = e.response.data;

      this.changeCommentState('fail', { errorMessage: message });
    }
  }

  async createRecomment(content, commentId, postId, userId, receiverId, accessToken) {
    try {
      await commentApiService.createRecomment(content, commentId, postId, userId, receiverId, accessToken);

      await this.fetchRecomment(postId);
    } catch (e) {
      const { message } = e.response.data;

      this.changeRecommentState('fail', { errorMessage: message });
    }

    this.publish();
  }

  async modifyComment(content, commentId) {
    await commentApiService.modifyComment(content, commentId);

    this.commentEditState = 0;

    this.publish();
  }

  async modifyRecomment(content, recommentId) {
    await commentApiService.modifyRecomment(content, recommentId);

    this.recommentEditState = 0;

    this.publish();
  }

  async deleteComment(commentId) {
    await commentApiService.deleteComment(commentId);

    this.publish();
  }

  async deleteCheckedComment(checkedComments) {
    await commentApiService.deleteComments(checkedComments);

    this.publish();
  }

  async deleteRecomment(recommentId) {
    await commentApiService.deleteRecomment(recommentId);

    this.publish();
  }

  async deleteCheckedRecomment(checkedRecomments) {
    await commentApiService.deleteRecomments(checkedRecomments);

    this.publish();
  }

  setRecommentVisibleState() {
    this.recommentVisibleState = 0;
  }

  changeRecommentVisibleState(commentId) {
    this.recommentVisibleState = commentId;
    this.commentEditState = 0;

    this.publish();
  }

  changeCommentEditState(commentId) {
    this.commentEditState = commentId;
    this.setRecommentVisibleState();

    this.publish();
  }

  changeRecommentEditState(recommentId) {
    this.recommentEditState = recommentId;
    this.commentEditState = 0;

    this.publish();
  }

  changeCommentNumber(commentPageNumber) {
    this.commentPageNumber = commentPageNumber;

    this.publish();
  }

  changeCommentState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.createCommentState = state;
    this.publish();
  }

  changeRecommentState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.createRecommentState = state;
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
