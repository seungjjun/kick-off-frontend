Feature('게시글 검색 - 축구 관련 정보를 얻으려는 사람이 얻고자 하는 정보를 빠르게 찾기 위해서 자신이 검색한 키워드가 포함되어있는 게시글만 확인할 수 있다.');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('제목을 기준으로 게시글을 찾는 경우', ({ I }) => {
  // Given
  // 게시글 세팅

  I.see('딸기 우유');

  // When
  I.selectOption('#select-keywordType', '1');
  I.fillField('#input-keyword', '아몬드');

  I.click('검색');

  // Then
  I.see('아몬드 오리지널”');
  I.dontSee('딸기 우유');
});

Scenario('내용을 기준으로 게시글을 찾는 경우', ({ I }) => {
  // Given
  // 게시글 세팅

  I.see('딸기 우유');

  // When
  I.selectOption('#select-keywordType', '2');
  I.fillField('#input-keyword', '고소');

  I.click('검색');

  // Then
  I.see('아몬드 오리지널”');
  I.dontSee('딸기 우유');
});

Scenario('작성자를 기준으로 게시글을 찾는 경우', ({ I }) => {
  // Given
  // 게시글 세팅

  // When
  I.selectOption('#select-keywordType', '3');
  I.fillField('#input-keyword', '피카츄');

  I.click('검색');

  // Then
  I.see('손흥민 발롱도르”');
  I.dontSee('이강인 푸스카스상');
});
