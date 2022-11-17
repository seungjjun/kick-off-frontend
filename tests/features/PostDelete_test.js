Feature('게시글 삭제 - 사용자는 자신이 등록한 게시글의 잘못된 정보를 수정하기 위해 게시글을 삭제할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('올바르게 게시글을 삭제한 경우', ({ I }) => {
  // Given
  I.amOnPage('/post/1');

  // When
  I.click('삭제');

  // Then
  I.see('전체 게시판');
});
