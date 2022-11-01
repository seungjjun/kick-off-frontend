import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('fetchUser', () => {
    context('자신의 정보를 불러올 경우', () => {
      it('자신의 정보를 확인할 수 있다.', async () => {
        await userStore.fetchUser();

        expect(userStore.user.id).toBe(1);
        expect(userStore.user.identification).toBe('jel1y');
        expect(userStore.user.name).toBe('Pikachu');
        expect(userStore.user.profileImage).toBe('imageUrl');
      });
    });
  });
});
