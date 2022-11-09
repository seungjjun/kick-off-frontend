import CategoryStore from './CategoryStore';

describe('CategoryStore', () => {
  let categoryStore;

  beforeEach(() => {
    categoryStore = new CategoryStore();
  });

  describe('fetchCategory', () => {
    it('카테고리의 정보를 확인할 수 있다', async () => {
      await categoryStore.fetchCategory();

      expect(categoryStore.categories[0].name).toBe('EPL');
    });
  });
});
