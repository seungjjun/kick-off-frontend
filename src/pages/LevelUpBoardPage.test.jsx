import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import LevelUpBoardPage from './LevelUpBoardPage';

const changeGrade = jest.fn();

const apply = jest.fn();

const fetchMyInformation = jest.fn();

const navigate = jest.fn();

const reset = jest.fn();

const isExistingUser = false;

const applicationErrorMessge = '';

let accessToken = '';

let myInformation = {};

jest.mock('../hooks/useGradeStore', () => () => ({
  changeGrade,
  apply,
  isExistingUser,
  applicationErrorMessge,
  reset,
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchMyInformation,
  myInformation,
}));

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('LevelUpBoardPage', () => {
  beforeEach(() => {
    myInformation = {
      user: {
        id: 1,
      },
    };

    render(<LevelUpBoardPage
      accessToken={accessToken}
    />);
  });

  context('when click submit button ', () => {
    accessToken = 'ACCESS.TOKEN';

    it('apply function called', async () => {
      fireEvent.change(screen.getByPlaceholderText('신청 사유를 입력해주세요'), {
        target: { value: '테스트' },
      });

      fireEvent.click(screen.getByText('등업신청'));

      await waitFor(() => {
        expect(apply).toBeCalled();
      });
    });
  });

  context('when not have accessToken', () => {
    accessToken = '';

    it('navigate called', () => {
      expect(navigate).toBeCalled();
    });
  });
});
