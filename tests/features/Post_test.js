Feature('게시글 상세 화면 - 사용자는 게시글의 세부 정보를 확인하기 위해 상세 페이지를 확인할 수 있다.');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('게시글의 세부 정보를 불러올 경우', ({ I }) => {
  I.click('[type=button]');

  I.see('손흥민 득점왕 수상');
});

Scenario('게시글의 조회수가 늘어나는 것을 확인할 경우', ({ I }) => {
  // Given
  I.click('[type=button]');
  I.see('1');

  // When
  I.amOnPage('/');

  I.click('[type=button]');

  // Then
  I.see('2');
});
