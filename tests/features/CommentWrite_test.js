Feature('댓글 작성 - 게시글에 자신의 의견을 남기려는 사람이 게시글의 정보에 대한 나의 생각이나 의견을 남기기 위해서 게시글에 댓글을 남길 수 있다.');

Before(({ I }) => {
  // 로그인
  I.setupDatabase();

  I.login();
});

Scenario('올바르게 댓글을 등록한 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.fillField('#input-content', '이강인 토트넘 이적 확정 실화냐?');

  I.click('[type=submit]');

  // Then
  I.see('이강인 토트넘 이적 확정 실화냐?');
});

// Scenario('내용을 입력하지 않고 댓글을 등록할 경우', ({ I }) => {
//   // Given
//   I.amOnPage('/post/1');

//   // When
//   I.click('[type=submit]');

//   // Then
//   I.see('내용을 입력해주세요');
// });

Scenario('로그인 하지 않고 댓글을 작성할 경우', ({ I }) => {
  // Given
  I.click('로그아웃');

  I.amOnPage('/post/1');

  // When
  I.click('[type=submit]');

  // Then
  I.see('LOGIN');
});
