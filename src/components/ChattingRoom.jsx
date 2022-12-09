/* eslint-disable no-use-before-define */

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

const MyChat = styled.li`
  flex-direction: column;
  justify-content: end;
  align-self: flex-end;
  text-align: end;
  padding-right: 1em;
  background-color: #AF5050;
  border-radius: 12px;
  border-top-right-radius: 1px;
`;

const OtherChat = styled.li`
  flex-direction: column;
  padding-left: 1em;
  border-radius: 12px;
  border-top-left-radius: 1px;
  /* color: #ff; */
  background-color: #EBEBEB;
`;

const Title = styled.h2`
  height: 40px;
  border-bottom: 1px solid #CCC;
  padding: 0.3em 0 0 1em;
`;

export default function ChattingRoom({
  message, messageChange, chatMessages, publishMessage, predictions, nickname,
}) {
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
                chatMessage.name === nickname ? (
                  <MyChat>
                    {chatMessage.message}
                  </MyChat>
                ) : (
                  <OtherChat>
                    <p>
                      {chatMessage.name}
                    </p>
                    {chatMessage.message}
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
