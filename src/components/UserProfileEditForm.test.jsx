import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import UserProfileEditForm from './UserProfileEditForm';

let edits = {};
let myInformation = {};

const context = describe;

describe('UserProfileEditForm', () => {
  beforeEach(() => {
    edits = {
      submit: jest.fn(),
      upload: jest.fn(),
      name: '피카츄',
      nameChange: jest.fn(),
      editState: '',
      errorMessage: '이미 사용중인 닉네임입니다.',
      image: '',
    };

    myInformation = {
      user: {
        name: '라이츄',
        profileImage: 'url',
      },
    };

    render(<UserProfileEditForm
      edits={edits}
      myInformation={myInformation}
    />);
  });

  context('when update user profile', () => {
    it('render edit form', () => {
      screen.getByDisplayValue('피카츄');
      screen.getByPlaceholderText('파일 선택');
      screen.getByText('수정완료');
    });

    it('submit function called', async () => {
      fireEvent.change(screen.getByDisplayValue('피카츄'), {
        target: { value: '라이츄' },
      });

      expect(edits.nameChange).toBeCalled();

      fireEvent.click(screen.getByText('수정완료'));

      await waitFor(() => {
        expect(edits.submit).toBeCalled();
      });
    });
  });
});
