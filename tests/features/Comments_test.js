Feature('댓글 리스트 - 사용자는 게시글에 대한 다양한 의견을 얻기 위해 게시글에 남겨진 댓글을 확인할 수 있다.');

Scenario('올바르게 등록된 댓글을 확인', ({ I }) => {
  // Given
  I.setupDatabase();

  // When
  I.amOnPage('/post/1');

  // Then
  I.see('대한민국 16강 응원합니다.');
});

Scenario('댓글이 20개가 넘어갈 경우', ({ I }) => {
  // Given
  I.settingPostsTen();

  // When
  I.amOnPage('/post/1');

  // Then
  I.see('대한민국 16강 응원합니다.');

  I.see('2');
});
