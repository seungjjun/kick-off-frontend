Feature('게시글 삭제 - 사용자는 자신이 등록한 게시글의 잘못된 정보를 수정하기 위해 게시글을 삭제할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('올바르게 게시글을 삭제한 경우', ({ I }) => {
  // Given
  I.login();

  I.amOnPage('/post/1');

  // When
  I.click('삭제');

  // Then
  I.see('게시글이 없습니다');
});

Scenario('자신의 게시글이 아닌 다른 사용자의 게시글을 삭제하려는 경우', ({ I }) => {
  // When
  I.amOnPage('/post/1');

  // Then
  I.dontSee('#post-delete');
});
