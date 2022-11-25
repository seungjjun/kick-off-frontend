import { fireEvent, render, screen } from '@testing-library/react';

import LikedPosts from './LikedPosts';

const navigate = jest.fn();
const cancelCheckedPost = jest.fn();

const context = describe;

describe('LikedPosts', () => {
  beforeEach(() => {
    const myInformation = {
      likedPosts: [
        {
          id: 10,
          postInformation: {
            title: '정신 차려 이 각박한 세상에서',
          },
          createdAt: '2022-11-22',
          hit: 1122,
        },
      ],

      user: {
        name: 'son7',
        isMyToken: true,
      },
    };
    render(<LikedPosts
      myInformation={myInformation}
      navigate={navigate}
      cancelCheckedPost={cancelCheckedPost}
    />);
  });

  it('render table header', () => {
    screen.getByText('선택');
    screen.getByText('제목');
    screen.getByText('작성자');
    screen.getByText('작성일');
    screen.getByText('조회');
  });

  it('render liked posts', () => {
    screen.getByText('정신 차려 이 각박한 세상에서');
    screen.getByText('son7');
    screen.getByText('2022-11-22');
    screen.getByText(1122);
  });

  context('when click liked post', () => {
    it('move to post page', () => {
      fireEvent.click(screen.getByText('정신 차려 이 각박한 세상에서'));

      expect(navigate).toBeCalledWith('/post/10');
    });
  });

  context('when cancel liked post', () => {
    it('cancel function called', () => {
      fireEvent.click(screen.getByTestId('checkbox'));

      fireEvent.click(screen.getByText('좋아요 취소'));

      expect(cancelCheckedPost).toBeCalled();
    });
  });

  context('when click write post button', () => {
    it('move to post page', () => {
      fireEvent.click(screen.getByText('글쓰기'));

      expect(navigate).toBeCalledWith('/write');
    });
  });
});
