import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import PostEditForm from './PostEditForm';

const navigate = jest.fn();
const submit = jest.fn();
const changeCategory = jest.fn();
const upload = jest.fn();
const titleChange = jest.fn();
const contentChange = jest.fn();

const context = describe;

describe('PostEditForm', () => {
  beforeEach(() => {
    const category = 'LaLiga';

    const image = 'imageUrl';

    const title = '11월 13일 토트넘 vs 리즈';

    const content = '토트넘 손흥민 부상';

    render(<PostEditForm
      category={category}
      navigate={navigate}
      submit={submit}
      changeCategory={changeCategory}
      upload={upload}
      image={image}
      title={title}
      content={content}
      titleChange={titleChange}
      contentChange={contentChange}
    />);
  });

  it('render input title', () => {
    screen.getByDisplayValue('11월 13일 토트넘 vs 리즈');
  });

  it('render input content', () => {
    screen.getByDisplayValue('토트넘 손흥민 부상');
  });

  it('render edit cancel button', () => {
    screen.getByText('수정취소');
  });

  context('when modify post', () => {
    it('submit to be called', async () => {
      fireEvent.change(screen.getByDisplayValue('11월 13일 토트넘 vs 리즈'), {
        target: { value: '손흥민 수술 성공적!!' },
      });

      fireEvent.change(screen.getByDisplayValue('토트넘 손흥민 부상'), {
        target: { value: '손흥민 월드컵 출전 가능성 높아' },
      });

      fireEvent.click(screen.getByText('수정완료'));

      await waitFor(() => {
        expect(submit).toBeCalled();
      });
    });
  });
});
