import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import useBoardStore from '../hooks/useBoardStore';
import useUserStore from '../hooks/useUserStore';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  content: {
    fontSize: '1.2em',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '16em',
    width: '24em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1em',
  },
};

const Bucket = styled.p`
    font-size: .8em;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
`;

const AcceptButton = styled.button`
  margin-right: 2em;
  width: 45%;
  color: #FFF;
`;

const RefuseButton = styled.button`
  width: 45%;
  color: #FFF;
`;

const BackButton = styled.button`
  width: 50%;
  height: 20%;
  color: #FFF;
`;

export default function ScheduleModal({ close, setClose, boardName }) {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const boardStore = useBoardStore();

  const { bucket } = userStore;

  const handleClickAccept = () => {
    setClose(false);

    navigate(`/schedule/${boardName}`);
  };

  const handleClickRefuse = () => {
    setClose(false);
  };

  const handleClickBack = () => {
    setClose(false);

    navigate(`/board?id=${boardStore.boardId}`);
  };

  return (
    <ReactModal
      isOpen={close}
      onRequestClose={handleClickAccept || handleClickRefuse}
      style={modalStyle}
      ariaHideApp={false}
    >
      {bucket === 0 ? (
        <>
          <p>이용 횟수를 초과하였습니다.</p>
          <BackButton type="button" onClick={handleClickBack}>뒤로가기</BackButton>
        </>
      ) : (
        <>
          <Bucket>
            이용 가능 횟수
            {' '}
            {bucket}
          </Bucket>
          <p>경기일정을 확인하겠습니까?</p>
          <p>(이용 횟수가 1회 차감됩니다.)</p>
          <Buttons>
            <AcceptButton type="button" onClick={handleClickAccept}>네</AcceptButton>
            <RefuseButton type="button" onClick={handleClickRefuse}>아니오</RefuseButton>
          </Buttons>
        </>
      )}
    </ReactModal>
  );
}
