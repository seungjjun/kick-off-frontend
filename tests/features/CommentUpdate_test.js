Feature('댓글 수정 - 게시글에 자신의 의견을 남기려는 사람이 자신의 의견이 변경되었음을 남기기 위해 자신이 작성한 댓글을 수정할 수 있다.');

Before(({ I }) => {
  // 로그인
  I.setupDatabase();

  I.login();
});

Scenario('올바르게 댓글을 수정한 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.click({ css: '#update-comment' });

  I.fillField('#input-content', '이강인 토트넘 이적 확정 실화냐?');

  I.click('수정완료');

  // Then
  I.see('이강인 토트넘 이적 확정 실화냐?');
});

Scenario('기존 내용은 지우고 수정할 내용을 입력하지 않고 수정할 경우 ', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.click({ css: '#update-comment' });

  I.fillField('#input-content', '');

  I.click('수정완료');

  // Then
  I.see('내용을 입력해주세요');
});
