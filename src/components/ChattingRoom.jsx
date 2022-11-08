/* eslint-disable no-use-before-define */
export default function ChattingRoom({
  message, messageChange, chatMessages, publishMessage,
}) {
  const handleChangeChat = (event) => {
    messageChange(event.target.value);
  };

  const handleClickSend = () => {
    publishMessage(message);
  };

  return (
    <div>
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
    </div>
  );
}
