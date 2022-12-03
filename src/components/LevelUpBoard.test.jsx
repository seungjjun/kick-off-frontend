import { render, screen } from '@testing-library/react';

import LevelUpBoard from './LevelUpBoard';

const submit = jest.fn();

const changeGrade = jest.fn();

const isExistingUser = false;

const applicationErrorMessge = '이미 신청 상태입니다.';

const context = describe;

describe('LevelUpBoard', () => {
  beforeEach(() => {
    render(<LevelUpBoard
      submit={submit}
      changeGrade={changeGrade}
      isExistingUser={isExistingUser}
      applicationErrorMessge={applicationErrorMessge}
    />);
  });

  it('render levelup form', () => {
    screen.getByText('등업 게시판');

    screen.getByText('세미프로');
    screen.getByText('프로');
    screen.getByText('월드클래스');

    screen.getByText('등업신청');
  });
});
