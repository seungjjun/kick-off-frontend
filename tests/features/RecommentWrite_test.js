Feature('대댓글 작성 - 등록되어 있는 댓글에 댓글을 작성하려는 사람이 댓글에 대한 나의 다른 의견을 남기거나 공감하기 위해서 댓글에 대한 대댓글을 작성할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('올바르게 대댓글을 등록한 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.click('답글쓰기');

  I.fillField('#input-content', '이강인 토트넘 이적 확정');

  I.click('등록');

  // Then
  I.see('이강인 토트넘 이적 확정');
});

Scenario('로그인 하지 않고 대댓글을 작성할 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.click('답글쓰기');

  // Then
  I.see('LOGIN');
});
