Feature('게시글 작성 - 축구 관련 정보를 공유하려는 사람이 다른 사람에게 알려주고 싶고, 나만 알기 아까워서 게시글을 작성해서 다른 사용자에게 정보를 공유할 수 있다.');

Before(({ I }) => {
  // 로그인
  I.login();

  I.amOnPage('/');

  I.amOnPage('/write');
});

Scenario('글을 성공적으로 작성한 경우', ({ I }) => {
  // When
  I.selectOption('#select-category', '1');

  I.fillField('#input-title', '이강인 토트넘 이적 확정');
  I.fillField('#input-content', 'EPL 코리안 리거 또 탄생');

  I.click('[type=submit]');
  // Then

  I.see('이강인 토트넘 이적 확정');
});

Scenario('게시판을 선택하지 않은 경우', ({ I }) => {
  // When
  I.fillField('#input-title', '이강인 토트넘 이적 확정');
  I.fillField('#input-content', 'EPL 코리안 리거 또 탄생');

  I.click('[type=submit]');

  // Then
  I.see('게시판을 선택해 주세요');
});

Scenario('제목을 입력하지 않은 경우', ({ I }) => {
  // When
  I.selectOption('#select-category', '1');

  I.fillField('#input-content', 'EPL 코리안 리거 또 탄생');

  I.click('[type=submit]');

  // Then
  I.seeInPopup('제목을 입력해주세요!!');
});

Scenario('내용을 입력하지 않은 경우', ({ I }) => {
  // When
  I.selectOption('#select-category', '1');

  I.fillField('#input-title', '이강인 토트넘 이적 확정');

  I.click('[type=submit]');

  // Then
  I.see('내용을 입력해주세요');
});

Scenario('로그인 하지 않고 게시글을 작성할 경우', ({ I }) => {
  // Given
  I.click('로그아웃');

  // When
  I.click('글쓰기');

  // Then
  I.see('LOGIN');
});
