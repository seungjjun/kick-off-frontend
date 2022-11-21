Feature('게시글 수정 - 축구 관련 정보를 공유하려는 사람이 잘못된 정보를 올바르게 수정하기 위해서 자신이 작성한 게시글을 수정할 수 있다.');

Before(({ I }) => {
  I.amOnPage('/');

  I.setupDatabase();
});

Scenario('올바르게 게시글을 수정한 경우', ({ I }) => {
  // Given
  I.login();

  I.amOnPage('/post/1');

  I.click('수정');

  // When
  I.selectOption('#select-board', '2');

  I.fillField('#input-title', '카타르 월드컵 연기???');
  I.fillField('#input-content', '카타르 월드컵 내년 8월으로 연기 확정');

  I.click('[type=submit]');

  // Then
  I.see('카타르 월드컵 연기???');
});

Scenario('내용을 바꾸지 않고 게시글을 수정할 경우', ({ I }) => {
  // Given
  I.login();

  I.amOnPage('/post/1');

  // When
  I.click('수정');

  I.selectOption('#select-board', '2');

  I.click('[type=submit]');
  I.click('[type=submit]');
  I.click('[type=submit]');

  // Then
  I.see('카타르 월드컵 개최 일주일 전');
  I.see('월드컵 기대가 됩니다.');
});

Scenario('자신의 글이 아닌 글을 수정하려는 경우', ({ I }) => {
  // Given
  I.login2();

  // When
  I.amOnPage('/post/1');

  // Then
  I.dontSee('#post-update"');
});

// Scenario('제목을 지우고 게시글을 수정할 경우', ({ I }) => {
//   // Given
//   I.amOnPage('/post/1');

//   I.click('수정');
//   // When
//   I.fillField('#input-title', '');

//   I.click('[type=submit]');

//   // Then
//   I.see('제목을 입력해주세요');
// });

// Scenario('내용을 지우고 게시글을 수정할 경우', ({ I }) => {
//   // Given
//   I.click('카타르 월드컵 개최 일주일 전');

//   I.click('수정');
//   // When
//   I.fillField('내용', '');

//   I.click('[type=submit]');

//   // Then
//   I.see('내용을 입력해주세요');
// });
