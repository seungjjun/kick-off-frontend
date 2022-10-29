import { fireEvent, render, screen } from '@testing-library/react';

import PostFormPage from './PostFormPage';

const navigate = jest.fn();
const fetchPosts = jest.fn();
const changeCategory = jest.fn();
const write = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/usePostStore', () => () => ({
  fetchPosts,
  changeCategory,
  write,
}));

test('PostFormPage', () => {
  render(<PostFormPage />);

  fireEvent.click(screen.getByText('게시판을 선택해 주세요'));
  fireEvent.click(screen.getByText('EPL'));
  screen.getByText('등록');

  // expect(changeCategory).toBeCalled();
});
