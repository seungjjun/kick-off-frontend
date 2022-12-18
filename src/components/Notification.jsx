/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import ReactModal from 'react-modal';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useNotificationStore from '../hooks/useNotificationStore';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    fontSize: '1.2em',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '32em',
    width: '32em',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
};

const DeleteButtons = styled.section`
    display: flex;
    justify-content: flex-end;

    button {
        background-color: #fff;
        color: #979797;
    }
    
    button:nth-child(2) {
        margin-right: 2em;
    }

    button:first-child {
        padding-right: 1em;
        margin-right: 1em;
        border-right: 1px solid #979797;
        border-radius: 0px;
    }
`;

const List = styled.ul`
    height: 19.5em;
    margin-top: .8em;
    overflow-y: auto;
`;

const Title = styled.h2`
    font-size: 1.2em;
    margin-bottom: 1em;
    text-align: center;
`;

const Item = styled.li`
    margin-bottom: .6em;
    margin-right: 1em;
    border-bottom: 1px solid #CCC;
    color: ${(props) => (props.toggle ? '#777777' : '#000')};

    section {
        display: flex;
        justify-content: space-between;    
    }

    p:first-child {
        display: flex;
        flex-direction: column;
    }

    p:nth-child(2) {
        font-size: .7em;
        align-self: center;
        color: #979797;
        cursor: pointer;
    }

    span {
        padding-bottom: .4em;
        cursor: pointer;
    }
`;

const Nothing = styled.p`
    text-align: center; 
`;

const ModalButton = styled.button`
  align-self: center;
  padding: 1em;
  width: 50%;
  color: #FFF;
`;

export default function Notification({ close, setClose }) {
  const navigate = useNavigate();

  const notificationStore = useNotificationStore();

  const commentNotification = notificationStore.notification;

  const handleClickNotification = (notificationId, postId) => {
    notificationStore.read(notificationId);

    navigate(`/post/${postId}`);

    setClose(!close);
  };

  const handleClickDelete = (notificationId) => {
    notificationStore.deleteNotification(notificationId);
  };

  const handleClickDeleteAll = () => {
    notificationStore.deleteAll();
  };

  const handleClickDeleteReadNotification = () => {
    notificationStore.deleteReadNotification();
  };

  const handleClickCheck = () => {
    setClose(false);
  };

  return (
    <ReactModal
      isOpen={close}
      onRequestClose={handleClickCheck}
      style={modalStyle}
      ariaHideApp={false}
    >
      <Title>알림</Title>
      {commentNotification.length === 0 ? (
        <Nothing>새로운 알림이 없습니다.</Nothing>
      ) : (
        <div>
          <DeleteButtons>
            <button type="button" onClick={handleClickDeleteReadNotification}>읽은 알림 삭제</button>
            <button type="button" onClick={handleClickDeleteAll}>전체 삭제</button>
          </DeleteButtons>
          <List>
            {commentNotification.map((notification) => (
              <Item
                toggle={notification.read}
                key={notification.id}
              >
                <section>
                  <p
                    onClick={() => handleClickNotification(notification.id, notification.postId)}
                  >
                    <span>
                      {notification.sender}
                      님 댓글:
                      "
                      {notification.content}
                      "
                    </span>
                    <span>
                      {notification.createdAt}
                    </span>
                  </p>
                  <p onClick={() => handleClickDelete(notification.id)}>
                    삭제
                  </p>
                </section>
              </Item>
            ))}
          </List>
        </div>
      )}
      <ModalButton type="button" onClick={handleClickCheck}>확인</ModalButton>
    </ReactModal>
  );
}
