import { fireEvent, render, screen } from '@testing-library/react';

import ChattingRoom from './ChattingRoom';

const messageChange = jest.fn();

const publishMessage = jest.fn();

describe('chattingRoom', () => {
  beforeEach(() => {
    const message = 'input';

    const chatMessages = ['메시지1', '메시지2'];

    render(<ChattingRoom
      message={message}
      messageChange={messageChange}
      chatMessages={chatMessages}
      publishMessage={publishMessage}
    />);
  });

  it('render send button', () => {
    screen.getByText('전송');
  });

  it('click send button', () => {
    fireEvent.change(screen.getByDisplayValue('input'), {
      target: { value: '안녕하세요' },
    });

    fireEvent.click(screen.getByText('전송'));

    expect(publishMessage).toBeCalled();
  });

  it('render message', () => {
    screen.getByText('메시지1');
  });
});
