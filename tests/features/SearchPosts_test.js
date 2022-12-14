Feature('게시글 검색 - 축구 관련 정보를 얻으려는 사람이 얻고자 하는 정보를 빠르게 찾기 위해서 자신이 검색한 키워드가 포함되어있는 게시글만 확인할 수 있다.');

Before(({ I }) => {
  I.settingSearchedPosts();

  I.amOnPage('/');
});

Scenario('제목을 기준으로 게시글을 찾는 경우', ({ I }) => {
  // Given
  I.see('김민재는 이탈리아 올해의 선수상');

  // When
  I.selectOption('#select-keywordType', '제목만');
  I.fillField('#input-keyword', '발롱도르');

  I.click('검색');

  // Then
  I.see('손흥민 발롱도르');
  I.dontSee('김민재는 이탈리아 올해의 선수상');
});

Scenario('내용을 기준으로 게시글을 찾는 경우', ({ I }) => {
  // Given
  I.see('김민재는 이탈리아 올해의 선수상');

  // When
  I.selectOption('#select-keywordType', '내용만');
  I.fillField('#input-keyword', '발롱도르');

  I.click('검색');

  // Then
  I.see('손흥민 발롱도르');
  I.dontSee('김민재는 이탈리아 올해의 선수상');
});

Scenario('작성자를 기준으로 게시글을 찾는 경우', ({ I }) => {
  // Given
  I.see('김민재는 이탈리아 올해의 선수상');

  // When
  I.selectOption('#select-keywordType', '닉네임');
  I.fillField('#input-keyword', '피카츄');

  I.click('검색');

  // Then
  I.see('손흥민 발롱도르');
  I.dontSee('김민재는 이탈리아 올해의 선수상');
});
