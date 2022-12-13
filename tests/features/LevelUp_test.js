Feature('등업 신청 - 등급 제한이 있는 게시판에 접근하려는 사람이 더 좋은 정보와 다양한 컨텐츠를 이용하기 위해서 자신의 등급보다 더 높은 등급으로 등업신청을 할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.login();
});

Scenario('등업 신청이 성공한 경우', ({ I }) => {
  // Given
  I.click('등업신청 게시판');

  // When
  I.selectOption('#select-grade', '세미프로');

  I.fillField('#input-reason', '더 많은 컨텐츠를 이용하기 위해서');

  I.click('[type=submit]');

  // Then
  I.see('신청이 완료되었습니다.');
});

Scenario('이미 신청중해서 심사중인 경우', ({ I }) => {
  // Given
  I.click('등업신청 게시판');

  // When
  I.selectOption('#select-grade', '세미프로');

  I.fillField('#input-reason', '더 많은 컨텐츠를 이용하기 위해서');

  I.click('[type=submit]');

  I.selectOption('#select-grade', '프로');

  I.fillField('#input-reason', '더 많은 컨텐츠를 이용하기 위해서');

  I.click('[type=submit]');

  // Then
  I.see('이미 신청 상태입니다.');
});

Scenario('신청 등급을 선택하지 않은 경우', ({ I }) => {
  // Given
  I.click('등업신청 게시판');

  // When
  I.fillField('#input-reason', '더 많은 컨텐츠를 이용하기 위해서');

  I.click('[type=submit]');

  // Then
  I.see('신청 등급을 선택해주세요.');
});

Scenario('신청 사유를 입력하지 않은 경우', ({ I }) => {
  // Given
  I.click('등업신청 게시판');

  // When
  I.selectOption('#select-grade', '2');

  I.click('[type=submit]');

  // Then
  I.see('신청 사유를 입력해주세요');
});
