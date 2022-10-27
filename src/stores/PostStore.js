import ApiService from '../services/ApiService';

const apiService = new ApiService();

export default class PostStore {
  constructor() {
    this.title = '';
    this.category = '';
    this.author = '';
    this.commentNumber = '';
    this.like = '';
  }

  async posts() {
    const {
      title, category, author, commentNumber, like,
    } = await apiService.fetchPosts();

    this.title = title;
    this.category = category;
    this.author = author;
    this.commentNumber = commentNumber;
    this.like = like;
  }
}
