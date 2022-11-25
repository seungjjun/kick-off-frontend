import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import WrittenComments from './WrittenComments';

const navigate = jest.fn();
const deleteCheckedComment = jest.fn();
const deleteCheckedRecomment = jest.fn();

const context = describe;

describe('WrittenComments', () => {
  beforeEach(() => {
    const myInformation = {
      user: {
        name: 'son7',
        isMyToken: true,
      },

      comments: [
        {
          id: 1,
          postId: 5,
          content: '1번째 댓글',
          commentDate: '2022-11-23',
          deleted: false,
        },
        {
          id: 2,
          content: '2번째 댓글',
          commentDate: '2022-11-24',
          deleted: false,
        },
      ],

      recomments: [
        {
          id: 1,
          content: '대댓글',
          commentDate: '2022-11-25',
        },
      ],
    };

    render(<WrittenComments
      myInformation={myInformation}
      navigate={navigate}
      deleteCheckedComment={deleteCheckedComment}
      deleteCheckedRecomment={deleteCheckedRecomment}
    />);
  });

  it('render table header', () => {
    screen.getByText('선택');
    screen.getByText('댓글');
    screen.getByText('작성일');
  });

  it('render comments', () => {
    screen.getByText('1번째 댓글');
    screen.getByText('2022-11-23');

    screen.getByText('2번째 댓글');
    screen.getByText('2022-11-24');

    screen.getByText('대댓글');
    screen.getByText('2022-11-25');
  });

  it('render comment buttons', () => {
    screen.getByText('삭제');

    screen.getByText('글쓰기');
  });

  context('when click comment', () => {
    it('move to post page', () => {
      fireEvent.click(screen.getByText('1번째 댓글'));

      expect(navigate).toBeCalledWith('/post/5');
    });
  });

  context('when click delete button', () => {
    it('comment delete function called', async () => {
      fireEvent.click(screen.getByText('삭제'));

      await waitFor(() => {
        expect(deleteCheckedComment).toBeCalled();
        expect(deleteCheckedRecomment).toBeCalled();
      });
    });
  });
});
