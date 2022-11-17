Feature('로그인 - KiCK OFF 서비스를 이용하려는 사람이 서비스의 다양한 컨텐츠를 이용하기 위해서 로그인을 할 수 있다.');

Before(({ I }) => {
  I.amOnPage('/');

  I.click('로그인');
});

Scenario('올바른 정보로 로그인 한 경우', ({ I }) => {
  // Given

  // When
  I.fillField('#input-userId', 'jel1y');
  I.fillField('#input-password', 'Qwe1234!');

  I.click('[type=submit]');

  // Then
  I.see('son7');
});

Scenario('잘못된 아이디를 입력한 경우', ({ I }) => {
  // Given

  // When
  I.fillField('#input-userId', 'xxx');
  I.fillField('#input-password', 'Qwe1234!');

  I.click('[type=submit]');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});

Scenario('잘못된 비밀번호를 입력한 경우', ({ I }) => {
  // Given

  // When
  I.fillField('#input-userId', 'jel1y');
  I.fillField('#input-password', 'xxx');

  I.click('[type=submit]');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});

Scenario('아이디를 입력하지 않았을 경우', ({ I }) => {
  // Given

  // When
  I.fillField('#input-password', 'Qwe1234!');

  I.click('[type=submit]');

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않았을 경우', ({ I }) => {
  // Given

  // When
  I.fillField('#input-userId', 'jel1y');

  I.click('[type=submit]');

  // Then
  I.see('비밀번호를 입력해주세요');
});
