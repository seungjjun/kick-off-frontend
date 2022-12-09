import ReactModal from 'react-modal';

import styled from 'styled-components';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  content: {
    fontSize: '1.2em',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '14em',
    width: '24em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1em',
  },
};

const ModalButton = styled.button`
  padding: 1em;
  width: 50%;
  color: #FFF;
`;

export default function Modal({ close, setClose }) {
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
      <p>
        게시판을 선택해 주세요.
      </p>
      <ModalButton type="button" onClick={handleClickCheck}>확인</ModalButton>
    </ReactModal>
  );
}
