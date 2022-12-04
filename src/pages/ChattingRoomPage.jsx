import { useEffect, useRef, useState } from 'react';

import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

import useScheduleStore from '../hooks/useScheduleStore';

import ChattingRoom from '../components/ChattingRoom';

export default function ChattingRoomPage({ myInformation, gameId }) {
  const scheduleStore = useScheduleStore();

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const stompClient = useRef({});

  useEffect(() => {
    const sockJs = new SockJs('http://localhost:8000/stomp/chat');

    stompClient.current = Stomp.over(sockJs);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/chat/room/${gameId}`, (chat) => {
        const content = JSON.parse(chat.body);

        setChatMessages((chatMessages) => [...chatMessages, content.message]);
      });

      stompClient.current.send(
        '/pub/chat/enter',
        {}
        , JSON.stringify({ roomId: gameId, writer: myInformation.user.name }),
      );
    });

    return () => {
      if (stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          stompClient.current.connected = false;
        });
      }
    };
  }, []);

  const publish = (message) => {
    if (!stompClient.current.connected) {
      return;
    }
    stompClient.current.send(
      '/pub/chat/message',
      {}
      , JSON.stringify({ roomId: gameId, writer: myInformation.user.name, message }),
    );
    setMessage('');
  };

  const publishMessage = (message) => {
    publish(message);
  };

  const messageChange = (value) => {
    setMessage(value);
  };

  return (
    <ChattingRoom
      message={message}
      messageChange={messageChange}
      chatMessages={chatMessages}
      publishMessage={publishMessage}
      predictions={scheduleStore.predictionsMatch}
    />
  );
}
