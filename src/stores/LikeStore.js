import { likeApiService } from '../services/LikeApiService';

import Store from './Store';

export default class LikeStore extends Store {
  constructor() {
    super();

    this.likes = [];
  }

  async fetchLike() {
    const data = await likeApiService.fetchLike();

    this.likes = data.likes;

    this.publish();
  }

  async countLike(postId, userId) {
    await likeApiService.like(postId, userId);

    this.fetchLike();

    this.publish();
  }
}

export const likeStore = new LikeStore();
