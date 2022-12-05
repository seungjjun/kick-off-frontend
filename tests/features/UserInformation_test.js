Feature('사용자 정보 - 자신의 정보나 다른 사용자의 정보를 확인하려는 사람이 특정 사용자가 작성한 게시글이나 댓글을 보고 어떤 활동을 했었는지 알기 위해서 사용자의 정보(닉네임. 등급)또는 사용자가 작성한 게시글, 댓글을 확인할 수 있다.');

Before(({ I }) => {
  I.settingSearchedPosts();

  I.amOnPage('/');
});

Scenario('자신의 정보를 확인하는 경우', ({ I }) => {
  // Given
  I.login();

  // When
  I.click('내 정보');

  // Then
  I.see('피카츄');
});

Scenario('자신이 등록한 게시글을 확인하는 경우', ({ I }) => {
  // Given
  I.login();

  // When
  I.click('내 정보');

  // Then
  I.see('작성글 수 1');
  I.see('손흥민 발롱도르');
});

Scenario('자신이 등록한 댓글을 확인하는 경우', ({ I }) => {
  // Given
  I.login();

  // When
  I.click('내 정보');

  I.click('작성 댓글');

  // Then
  I.see('작성 댓글 수 1');

  I.see('이강인도 대단하다');
});

Scenario('자신이 좋아요 누른 게시글을 확인하는 경우', ({ I }) => {
  // Given
  I.login();

  I.amOnPage('/post/1');

  I.click('좋아요');

  // When
  I.click('내 정보');

  I.click('좋아요한 글');

  // Then
  I.see('김민재는 이탈리아 올해의 선수상');
});

Scenario('로그인 하지 않고 사용자 정보를 확인하려는 경우', ({ I }) => {
  // Given
  // When
  I.click('피카츄');

  // Then
  I.see('LOGIN');
});
