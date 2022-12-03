import GradeStore from './GradeStore';

const context = describe;

describe('GradeStore', () => {
  let gradeStore;

  beforeEach(() => {
    gradeStore = new GradeStore();
  });

  context('등업신청을 할 경우', () => {
    it('신청완료 메시지를 확인할 수 있다.', async () => {
      await gradeStore.apply();

      expect(gradeStore.successMessage.message).toBe('신청이 완료되었습니다.');
    });
  });
});
