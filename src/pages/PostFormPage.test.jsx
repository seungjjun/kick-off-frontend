import {
  fireEvent,
  render, screen,
} from '@testing-library/react';

import PostFormPage from './PostFormPage';

const navigate = jest.fn();
const changeBoard = jest.fn();
const write = jest.fn();
const upload = jest.fn();

const context = describe;

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/usePostStore', () => () => ({
  write,
  upload,
}));

jest.mock('../hooks/useBoardStore', () => () => ({
  changeBoard,
}));

describe('PostFormPage', () => {
  it('render board select', () => {
    render(<PostFormPage />);

    expect(screen.getByRole('option', { name: '게시판을 선택해 주세요' }).selected).toBeTruthy();
  });

  context('when click board', () => {
    it('change board function called', () => {
      // fireEvent.change(screen.getByTestId('select-board', {
      //   target: { value: '2' },
      // }));

      // screen.getByRole('option');

      // fireEvent.change(select, {
      //   target: { value: 2 },
      // });
      // expect()
    });
  });

  it('render input title', () => {
    render(<PostFormPage />);

    expect(screen.getByPlaceholderText('제목을 입력해 주세요'));
  });

  it('render input content', () => {
    render(<PostFormPage />);

    expect(screen.getByPlaceholderText('내용을 입력하세요'));
  });

  it('render upload file button', () => {
    render(<PostFormPage />);

    expect(screen.getByPlaceholderText('파일 선택'));
  });
});
