Feature('대댓글 삭제 - ');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('삭제되지 않은 댓글의 대댓글을 삭제할 경우', ({ I }) => {
  // Given
  I.settingRecomments();

  I.amOnPage('/post/1');

  // When
  I.click('#delete-recomment');

  // Then
  I.dontSee('16강 가능할까?');
});

Scenario('이미 삭제되어 있는 댓글의 대댓글이 1개이고 해당 대댓글을 삭제할 경우', ({ I }) => {
  // Given
  I.settingRecomments();

  I.amOnPage('/post/1');

  I.click('#delete-comment');

  // When
  I.click('#delete-recomment');

  // Then
  I.dontSee('삭제된 댓글입니다.');
});

Scenario('이미 삭제되어 있는 댓글의 대댓글이 2개이상이고 해당 대댓글을 삭제할 경우', ({ I }) => {
  // Given
  I.settingRecomments();

  I.amOnPage('/post/1');

  I.click('#delete-comment');

  // When
  I.click('#delete-recomment');

  // Then
  I.dontSee('삭제된 댓글입니다.');
});
