Feature('전체 게시판 - 사용자는 다양한 정보를 얻기 위해 등록된 게시글을 확인할 수 있다.');

Scenario('게시글이 존재할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When

  // Then
  I.see('손흥민 득점왕 수상');

  I.see('EPL');

  I.see('굉민재');
});

Scenario('화제 게시글이 존재할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When

  // Then
  I.see('화제');

  I.see('굉민재 김장하다!!');

  I.see('SerieA');

  I.see('굉민재');
});

Scenario('게시글이 15개 이상 존재할 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('2');

  // Then
  I.see('대한민국 카타르 월드컵 4강 진출!');

  I.see('전체게시판');

  I.see('대한민국');
});
