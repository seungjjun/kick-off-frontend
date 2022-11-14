Feature('댓글 작성 - 사용자는 게시글에 자신의 의견을 남기기 위해 댓글을 등록할 수 있다.');

Before(({ I }) => {
  // 로그인
  I.amOnPage('/');

  // 게시글 1개(제목: 카타르 월드컵 개최 일주일 전) 세팅
});

Scenario('올바르게 댓글을 등록한 경우', ({ I }) => {
  // Given
  I.click('카타르 월드컵 개최 일주일 전');

  // When
  I.fillField('안녕하세요!');

  I.click('[type=submit]');

  // Then
  I.see('안녕하세요!');
});

Scenario('내용을 입력하지 않고 댓글을 등록할 경우', ({ I }) => {
  // Given
  I.click('카타르 월드컵 개최 일주일 전');

  // When
  I.click('[type=submit]');

  // Then
  I.see('내용을 입력해주세요');
});

Scenario('로그인 하지 않고 댓글을 작성할 경우', ({ I }) => {
  // Given
  I.click('로그아웃');

  I.click('카타르 월드컵 개최 일주일 전');

  // When
  I.click('[type=submit]');

  // Then
  I.see('LOGIN');
});
