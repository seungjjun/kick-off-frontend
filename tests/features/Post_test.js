Feature('게시글 상세 화면 - 축구 관련 정보를 얻으려는 사람이 글과 관련된 자세한 정보를 얻기 위해서 게시글의 내용을 확인할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();
});

Scenario('게시글의 세부 정보를 불러올 경우', ({ I }) => {
  // When
  I.amOnPage('/post/1');

  // Then
  I.see('전체 게시판');
  I.see('카타르 월드컵 개최 일주일 전');
  I.see('son7');
  I.see('2022-11-14');
});

Scenario('게시글의 조회수가 늘어나는 것을 확인할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');
  I.see('10');

  // When
  I.amOnPage('/post/1');

  // Then
  I.see('11');
});
