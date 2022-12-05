import { render, screen } from '@testing-library/react';

import LevelUpBoard from './LevelUpBoard';

const submit = jest.fn();

const changeGrade = jest.fn();

const context = describe;

describe('LevelUpBoard', () => {
  beforeEach(() => {
    const applicationPosts = [
      {
        id: 1,
        applicant: {
          name: '치코리타',
          currentGrade: '세미프로',
          applicationGrade: '프로',
        },
        state: 'processing',
      },
    ];

    const errorMessages = {
      isExistingUser: false,
      isSelectGrade: false,
      isApplicationSuccess: false,
      applicationErrorMessge: '이미 신청 상태입니다.',

    };

    render(<LevelUpBoard
      submit={submit}
      changeGrade={changeGrade}
      errorMessages={errorMessages}
      applicationPosts={applicationPosts}
    />);
  });

  context('when click levelup board', () => {
    it('render levelup form', () => {
      screen.getByText('등업 게시판');

      screen.getAllByText('세미프로');
      screen.getAllByText('프로');
      screen.getByText('월드클래스');

      screen.getByText('등업신청');
    });
  });

  context('when check my application state', () => {
    it('render my application post', () => {
      screen.getByText('치코리타');
      screen.getAllByText('세미프로');
      screen.getAllByText('프로');
      screen.getByText('진행중');
    });
  });
});
