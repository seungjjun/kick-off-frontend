import { fireEvent, render, screen } from '@testing-library/react';

import Notification from './Notification';

const setClose = jest.fn();

const navigate = jest.fn();

const read = jest.fn();
const deleteNotification = jest.fn();
const deleteAll = jest.fn();
const deleteReadNotification = jest.fn();

let notification = [];

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

jest.mock('../hooks/useNotificationStore', () => () => ({
  notification,
  read,
  deleteNotification,
  deleteAll,
  deleteReadNotification,
}));

const context = describe;
describe('Notification', () => {
  const rendering = () => {
    const close = true;

    render(<Notification
      close={close}
      setClose={setClose}
    />);
  };

  context('when not have notifications', () => {
    beforeEach(() => {
      rendering();
    });

    it('render nothing', () => {
      screen.getByText('새로운 알림이 없습니다.');
    });
  });

  context('when have notifications', () => {
    beforeEach(() => {
      notification = [
        {
          content: '캬캬캬',
          id: 1408,
          postId: 1125,
          read: false,
          sender: '치코리타',
          createdAt: '2022-12-17',
        },
      ];
      rendering();
    });

    it('render notifications', () => {
      screen.getByText('읽은 알림 삭제');
      screen.getByText('전체 삭제');

      screen.getByText('치코리타님 댓글: "캬캬캬"');

      screen.getByText('삭제');

      screen.getByText('확인');
    });

    context('when read notification', () => {
      it('read function to be called', () => {
        fireEvent.click(screen.getByText('치코리타님 댓글: "캬캬캬"'));

        expect(read).toBeCalled();
      });
    });

    context('when delete one notification', () => {
      it('delete function to be called', () => {
        fireEvent.click(screen.getByText('삭제'));

        expect(deleteNotification).toBeCalled();
      });
    });

    context('when delete all notifications', () => {
      it('deleteAll function to be called', () => {
        fireEvent.click(screen.getByText('전체 삭제'));

        expect(deleteAll).toBeCalled();
      });
    });

    context('when delete read notifications', () => {
      it('deleteAll function to be called', () => {
        fireEvent.click(screen.getByText('읽은 알림 삭제'));

        expect(deleteReadNotification).toBeCalled();
      });
    });

    context('when close notification window', () => {
      it('close function to be called', () => {
        fireEvent.click(screen.getByText('확인'));

        expect(setClose).toBeCalled();
      });
    });
  });
});
