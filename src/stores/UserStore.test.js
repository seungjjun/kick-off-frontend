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

    context('모든 유저의 정보를 불러올 경우', () => {
      it('불러온 유저들의 정보를 확인할 수 있다.', async () => {
        await userStore.fetchUsers();

        expect(userStore.users[0].name).toBe('son7');
      });
    });

    context('로그인에 성공할 경우', () => {
      it('개인 정보를 확인할 수 있다.', async () => {
        await userStore.login({ userId: 'jel1y', password: 'Qwe1234!' });

        expect(userStore.name).toBe('노승준');
        expect(userStore.gradeName).toBe('World Class');
      });
    });

    context('아이디를 입력하지 않고 로그인 할 경우', () => {
      it('아이디를 입력해달라는 문구를 확인할 수 있다.', async () => {
        await userStore.login({ userId: '', password: 'Qwe1234!' });

        expect(userStore.loginErrorMessge).toBe('아이디를 입력해주세요');
      });
    });

    context('비밀번호를 입력하지 않고 로그인 할 경우', () => {
      it('아이디를 입력해달라는 문구를 확인할 수 있다.', async () => {
        await userStore.login({ userId: 'jel1y', password: '' });

        expect(userStore.loginErrorMessge).toBe('비밀번호를 입력해주세요');
      });
    });

    context('사용자의 정보를 확인하려는 경우', () => {
      it('사용자의 정보를 확인할 수 있다.', async () => {
        await userStore.fetchMyInformation(1);

        const { myInformation } = userStore;

        expect(myInformation.user.identification).toBe('jel1y');
        expect(myInformation.user.name).toBe('son');
      });

      it('사용자가 작성한 게시글을 확인할 수 있다.', async () => {
        await userStore.fetchMyInformation(1);

        const { myInformation } = userStore;

        expect(myInformation.posts[0].postInformation.title).toBe('아르헨티나 월드컵 우승');
        expect(myInformation.posts[0].createdAt).toBe('2022-12-19');
      });

      it('사용자가 작성한 댓글을 확인할 수 있다.', async () => {
        await userStore.fetchMyInformation(1);

        const { myInformation } = userStore;

        expect(myInformation.comments[0].content).toBe('대한민국은..?');
        expect(myInformation.comments[0].commentDate).toBe('2022-12-20');
      });

      it('사용자가 좋아요한 게시글을 확인할 수 있다.', async () => {
        await userStore.fetchMyInformation(1);

        const { myInformation } = userStore;

        expect(myInformation.likedPosts[0].postInformation.title).toBe('2022년 마지막 날');
        expect(myInformation.likedPosts[0].createdAt).toBe('2022-12-31');
      });
    });
  });
});
