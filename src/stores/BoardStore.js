import { boardApiService } from '../services/BoardApiService';

import Store from './Store';

export default class BoardStore extends Store {
  constructor() {
    super();

    this.boards = [];
    this.boardName = '전체게시판';
    this.boardId = 0;

    this.posts = {};
    this.page = {};

    this.comments = [];
    this.recomments = [];

    this.page = {};
    this.pageNumber = 0;
    this.pageButton = [];

    this.keywordType = 'title';
    this.keyword = '';
  }

  async fetchBoards() {
    const data = await boardApiService.fetchBoards();

    this.boards = data.board;

    this.publish();
  }

  async fetchPosts(pageNumber, boardId) {
    const data = await boardApiService.fetchPosts(pageNumber, boardId);

    this.posts = data.posts;

    this.comments = data.posts.comments;
    this.recomments = data.posts.reComments;

    this.page = data.page;

    this.makePage();

    this.publish();
  }

  async searchPosts({ keyword, boardId, pageNumber }) {
    const data = await boardApiService.searchPosts({
      keyword, keywordType: this.keywordType, boardId, pageNumber,
    });

    this.posts = data.posts;
    this.page = data.page;

    this.makePage();

    this.publish();
  }

  makePage() {
    const pageButtons = [...Array(this.page.lastPage)].map((page, index) => index + 1);
    this.pageButton = pageButtons.slice(this.page.startPage - 1, this.page.lastPage);

    this.publish();
  }

  changePageNumber(pageNumber) {
    this.pageNumber = pageNumber;

    this.publish();
  }

  changeBoard(boardId) {
    this.boardId = boardId;

    this.publish();
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }

  changeKeywordType(type) {
    this.keywordType = type;

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

  setKeyword(boardName) {
    this.keyword = '';

    this.boardName = boardName;
    this.pageNumber = 0;

    this.publish();
  }
}

export const boardStore = new BoardStore();
