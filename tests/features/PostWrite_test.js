Feature('게시글 작성 - 사용자는 정보를 공유하기 위해 게시글을 등록할 수 있다.');

Before(({ I }) => {
  I.amOnPage('/write');
});

Scenario('글을 성공적으로 작성한 경우', ({ I }) => {
  // When
  I.click('게시판을 선택해 주세요');

  I.click('EPL');

  I.fillField('제목', '이강인 토트넘 이적 확정');
  I.fillField('내용', 'EPL 코리안 리거 또 탄생');

  // Then
  I.click('[type=submit]');
});

Scenario('게시판을 선택하지 않은 경우', ({ I }) => {
  // When
  I.fillField('제목', '이강인 토트넘 이적 확정');
  I.fillField('내용', 'EPL 코리안 리거 또 탄생');

  I.click('[type=submit]');

  // Then
  I.see('게시판을 선택해 주세요');
});

Scenario('제목을 입력하지 않은 경우', ({ I }) => {
  // When
  I.click('게시판을 선택해 주세요');

  I.click('EPL');

  I.fillField('내용', 'EPL 코리안 리거 또 탄생');

  I.click('[type=submit]');

  // Then
  I.see('제목을 입력하세요');
});
