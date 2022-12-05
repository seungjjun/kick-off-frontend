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

const VoteBox = styled.section`
  height: 20%;
  border: 1px solid #CCC;
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

  input {
    padding: .5em;
  }
`;

const Chatting = styled.div`
  
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
  background-color: #DCEBFD;
  border: 1px solid #DCEBFD;
  border-radius: 12px;
  border-top-right-radius: 1px;
  
`;

const OtherChat = styled.li`
  flex-direction: column;
  padding-left: 1em;
  border: 1px solid #F1F1F4;
  border-radius: 12px;
  border-top-left-radius: 1px;
  color: #CCC;
  background-color: #F1F1F4;

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
        {/* <VoteBox>
          <button type="button">응원</button>
        </VoteBox> */}
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
        </ChattingBox>
      </CheeringBox>
    </Container>
  );
}
