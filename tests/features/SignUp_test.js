Feature('회원가입 - KiCK OFF 서비스를 이용하기 위해 회원가입 하려는 사람이 다양한 컨텐츠를 이용하기 위해서 회원가입을 할 수 있다.');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('정상적으로 회원가입에 성공할 경우', ({ I }) => {
  // Given
  I.click('회원가입');

  // When
  I.fillField('#input-name', '짱구');
  I.fillField('#input-identification', 'jjanggu');
  I.fillField('#input-password', 'Qwe1234!');
  I.fillField('#input-confirmPassword', 'Qwe1234!');

  I.click('#signup');

  // Then
  I.see('로그인');
});

Scenario('잘못된 닉네임을 입력한 경우', ({ I }) => {
  // Given
  I.click('회원가입');

  // When
  I.fillField('#input-name', '이건닉네임일까요아닐까요');
  I.fillField('#input-identification', 'jel1y');
  I.fillField('#input-password', 'Qwe1234!');
  I.fillField('#input-confirmPassword', 'Qwe1234!');

  I.click('#signup');

  // Then
  I.see('닉네임을 다시 확인해주세요');
});

Scenario('잘못된 아이디를 입력한 경우', ({ I }) => {
  // Given
  I.click('회원가입');

  // When
  I.fillField('#input-name', '피카츄');
  I.fillField('#input-identification', 'abc');
  I.fillField('#input-password', 'Qwe1234!');
  I.fillField('#input-confirmPassword', 'Qwe1234!');

  I.click('#signup');

  // Then
  I.see('아이디를 다시 확인해주세요');
});

Scenario('잘못된 비밀번호를 입력한 경우', ({ I }) => {
  // Given
  I.click('회원가입');

  // When
  I.fillField('#input-name', '피카츄');
  I.fillField('#input-identification', 'jel1y');
  I.fillField('#input-password', 'xxx');
  I.fillField('#input-confirmPassword', 'Qwe1234!');

  I.click('#signup');

  // Then
  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호와 일치하지 않는 확인 비밀번호를 입력한 경우', ({ I }) => {
  // Given
  I.click('회원가입');

  // When
  I.fillField('#input-name', '피카츄');
  I.fillField('#input-identification', 'jel1y');
  I.fillField('#input-password', 'Qwe1234!');
  I.fillField('#input-confirmPassword', 'xxx');

  I.click('#signup');

  // Then
  I.see('비밀번호가 일치하지 않습니다');
});
