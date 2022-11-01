import {
  render, screen,
} from '@testing-library/react';

import PostFormPage from './PostFormPage';

const navigate = jest.fn();
const fetchPosts = jest.fn();
const changeCategory = jest.fn();
const write = jest.fn();
const upload = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPosts,
  changeCategory,
  write,
  upload,
}));

describe('PostFormPage', () => {
  it('render category', () => {
    render(<PostFormPage />);

    expect(screen.getByRole('option', { name: '게시판을 선택해 주세요' }).selected).toBeTruthy();
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
