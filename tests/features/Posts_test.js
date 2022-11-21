Feature('전체 게시글 목록 - 축구 관련 정보를 얻으려는 사람이 내가 원하는 정보를 찾기 위해서 다른 사용자가 등록한 게시글 목록을 확인할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('게시글이 존재할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When

  // Then
  I.see('카타르 월드컵 개최 일주일 전');

  I.see('son7');
});

Scenario('게시글이 10개 이상 존재할 경우', ({ I }) => {
  I.settingPostsTen();

  // Given
  I.amOnPage('/');

  // When
  I.click('2');

  // Then
  I.see('카타르 월드컵 개최 일주일 전');
});

Scenario('게시글이 100개 이상 존재할 경우', ({ I }) => {
  I.settingPosts();

  // Given
  I.amOnPage('/');

  // When
  I.click('다음');

  // Then
  I.see('이전');

  I.see('11');
});
