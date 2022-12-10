/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */

import { useRef, useEffect } from 'react';

import styled from 'styled-components';

import Comparison from './Comparison';

const Container = styled.div`
  display:flex ;
  width: 100%;
  gap: 3em;
`;

const CheeringBox = styled.section`
  width: 30%;
`;

const ChattingBox = styled.section`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  margin-top: 1em;
  border: 1px solid #CCC;
`;

const InputMessageBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  border-top: 1px solid #CCC;
  gap: 0.5em;

  input {
    width: 70%;
    padding: .4em;
  }

  button {
    width: 30%;
  }
`;

const Chatting = styled.div`
  height: 650px;
  overflow-y: auto;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    margin: 1em;
    padding: 1em;
    width: 80%;
    height: auto;
    word-break: break-all;
  }
`;

const EnterChat = styled.li`
  font-size: .8em;
  font-weight: bold;
  color: #000;
`;

const MyChat = styled.li`
  flex-direction: column;
  justify-content: end;
  align-self: flex-end;
  text-align: end;
  padding-right: 1em;
  background-color: #AF5050;
  border-radius: 12px;
  border-top-right-radius: 1px;

  p:nth-child(1) {
    font-weight: bold;
    margin-bottom: .6em;
  }
`;

const OtherChat = styled.li`
  flex-direction: column;
  padding-left: 1em;
  border-radius: 12px;
  border-top-left-radius: 1px;
  background-color: #EBEBEB;
  
  p:nth-child(1) {
    font-weight: bold;
    margin-bottom: .6em;
  }
`;

const Title = styled.h2`
  height: 40px;
  border-bottom: 1px solid #CCC;
  padding: 0.3em 0 0 1em;
`;

export default function ChattingRoom({
  message, messageChange, chatMessages, publishMessage, predictions, nickname,
}) {
  const messages = useRef(null);

  const scrollToBottom = () => {
    messages.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChangeChat = (event) => {
    messageChange(event.target.value);
  };

  const handleClickSend = () => {
    publishMessage(message);
  };

  return (
    <Container>
      <Comparison
        predictions={predictions}
      />
      <CheeringBox>
        <ChattingBox>
          <InputMessageBox>
            <input
              type="text"
              name="input-chat"
              onChange={handleChangeChat}
              value={message}
              onKeyPress={(e) => e.which === 13 && publishMessage(message)}
            />
            <button type="button" onClick={handleClickSend}>전송</button>
          </InputMessageBox>
          <Chatting>
            <List>
              {chatMessages.map((chatMessage) => (
                chatMessage.name === nickname && chatMessage.message !== `${chatMessage.writer}님이 채팅방에 입장하였습니다.` ? (
                  <MyChat ref={messages}>
                    <p>
                      {chatMessage.name}
                    </p>
                    <p>
                      {chatMessage.message}
                    </p>
                  </MyChat>
                ) : chatMessage.message === `${chatMessage.writer}님이 채팅방에 입장하였습니다.` ? (
                  <EnterChat ref={messages}>
                    {chatMessage.message}
                  </EnterChat>
                ) : (
                  <OtherChat ref={messages}>
                    <p>
                      {chatMessage.name}
                    </p>
                    <p>
                      {chatMessage.message}
                    </p>
                  </OtherChat>
                )
              ))}
            </List>
          </Chatting>
          <Title>
            실시간 응원
          </Title>
        </ChattingBox>
      </CheeringBox>
    </Container>
  );
}
