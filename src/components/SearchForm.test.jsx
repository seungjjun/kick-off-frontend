import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import SearchForm from './SearchForm';

const submit = jest.fn();

const changeKeywordType = jest.fn();

const context = describe;

describe('SearchForm', () => {
  beforeEach(() => {
    render(<SearchForm
      submit={submit}
      changeKeywordType={changeKeywordType}
    />);
  });

  it('render search form', () => {
    screen.findByRole('select');

    screen.getByText('제목만');
    screen.getByText('내용만');
    screen.getByText('닉네임');

    screen.getByText('검색');
  });

  context('when search post', () => {
    it('submit function called', async () => {
      fireEvent.change(screen.getByPlaceholderText('검색어를 입력해주세요'), {
        target: { value: '손흥민' },
      });

      fireEvent.submit(screen.getByText('검색'));

      await waitFor(() => {
        expect(submit).toBeCalled();
      });
    });
  });
});
