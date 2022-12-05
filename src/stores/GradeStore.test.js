import GradeStore from './GradeStore';

const context = describe;

describe('GradeStore', () => {
  let gradeStore;

  beforeEach(() => {
    gradeStore = new GradeStore();
  });

  context('when write application post successfully', () => {
    it('check success message', async () => {
      gradeStore.changeGrade('프로');
      await gradeStore.apply('신청 사유', 1);

      expect(gradeStore.successMessage.message).toBe('신청이 완료되었습니다.');
    });
  });

  context('when didnt`t write reason', () => {
    it('check content errorMessage', async () => {
      gradeStore.changeGrade('프로');
      await gradeStore.apply('', 1);

      expect(gradeStore.applicationErrorMessge.message).toBe('신청 사유를 입력해주세요.');
    });
  });

  context('when didnt`t write grade', () => {
    it('check grade errorMessage', async () => {
      await gradeStore.apply('신청 사유', 1);

      expect(gradeStore.applicationErrorMessge).toBe('신청 등급을 선택해주세요.');
    });
  });

  context('when didnt`t write userId', () => {
    it('check grade errorMessage', async () => {
      gradeStore.changeGrade('프로');
      await gradeStore.apply('신청 사유', 0);

      expect(gradeStore.applicationErrorMessge.message).toBe('사용자를 찾을 수 없습니다.');
    });
  });
});
