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
  height: 80%;
  margin-top: 1em;
  border: 1px solid #CCC;
`;

export default function ChattingRoom({
  message, messageChange, chatMessages, publishMessage, predictions,
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
        <VoteBox>
          <button type="button">응원</button>
        </VoteBox>
        <ChattingBox>
          <input
            type="text"
            name="input-chat"
            onChange={handleChangeChat}
            value={message}
            onKeyPress={(e) => e.which === 13 && publishMessage(message)}
          />
          <button type="button" onClick={handleClickSend}>전송</button>
          <div>
            <ul>
              {chatMessages.map((chatMessage) => (
                <li>
                  {chatMessage}
                </li>
              ))}
            </ul>
          </div>
        </ChattingBox>
      </CheeringBox>
    </Container>
  );
}
