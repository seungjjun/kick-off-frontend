Feature('대댓글 수정 - 대댓글을 작성한 사람이 기존에 작성했던 내용에 대한 생각이 바뀌었다는것을 알리기 위해 자신이 작성한 대댓글을 수정할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('올바르게 대댓글을 수정한 경우', ({ I }) => {
  // Given
  I.login();

  I.amOnPage('/post/1');

  I.click('답글쓰기');

  I.fillField('#input-content', '이강인 토트넘 이적 확정');

  I.click('등록');

  // When
  I.click('#update-recomment');

  I.fillField('#input-content', '이강인 토트넘 이적 루머로 밝혀져..');

  I.click('수정완료');

  // Then
  I.see('이강인 토트넘 이적 루머로 밝혀져..');
});

Scenario('자신의 대댓글이 아닌 다른 사용자의 대댓글을 수정하려는 경우', ({ I }) => {
  // Given
  I.login2();

  // When
  I.amOnPage('/post/1');

  // Then
  I.dontSee('#update-recomment');
});
