Feature('댓글 삭제 - 게시글에 자신의 의견을 남기려는 사람이 ');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('대댓글이 없는 댓글을 삭제할 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.click('삭제');
  // Then

  I.dontSee('대한민국 16강 응원합니다.');
});

Scenario('대댓글이 있는 댓글을 삭제할 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  I.click('답글쓰기');

  I.fillField('#input-content', '이강인 토트넘 이적 확정');

  I.click('등록');

  // When
  I.click('#delete-comment');

  // Then
  I.see('삭제된 댓글입니다');
});
