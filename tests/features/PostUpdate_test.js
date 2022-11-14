Feature('게시글 수정 - 사용자는 자신이 등록한 게시글의 잘못된 정보를 수정하기 위해 게시글을 수정 할 수 있다.');

Before(({ I }) => {
  // 로그인
  I.amOnPage('/');

  // 게시글 1개 세팅 (제목: 카타르 월드컵 개최 일주일 전)
});

Scenario('올바르게 게시글을 수정한 경우', ({ I }) => {
  // Given
  I.click('카타르 월드컵 개최 일주일 전');

  I.click('수정');

  // When
  I.click('게시판을 선택해 주세요');

  I.click('EPL');

  I.fillField('제목', '카타르 월드컵 연기???');
  I.fillField('내용', '카타르 월드컵 내년 8월으로 연기 확정');

  I.click('[type=submit]');

  // Then
  I.see('카타르 월드컵 연기???');
});

Scenario('내용을 바꾸지 않고 게시글을 수정할 경우', ({ I }) => {
  // Given
  I.click('카타르 월드컵 개최 일주일 전');

  // When
  I.click('수정');

  I.click('[type=submit]');

  // Then
  I.see('카타르 월드컵 개최 일주일 전');
});

Scenario('제목을 지우고 게시글을 수정할 경우', ({ I }) => {
  // Given
  I.click('카타르 월드컵 개최 일주일 전');

  I.click('수정');
  // When
  I.fillField('제목', '');

  I.click('[type=submit]');

  // Then
  I.see('제목을 입력해주세요');
});

Scenario('내용을 지우고 게시글을 수정할 경우', ({ I }) => {
  // Given
  I.click('카타르 월드컵 개최 일주일 전');

  I.click('수정');
  // When
  I.fillField('내용', '');

  I.click('[type=submit]');

  // Then
  I.see('내용을 입력해주세요');
});
