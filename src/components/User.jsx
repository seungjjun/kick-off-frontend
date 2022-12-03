/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

import LikedPosts from './LikedPosts';
import UserProfileEditForm from './UserProfileEditForm';

import WrittenComments from './WrittenComments';

import WrittenPosts from './WrittenPosts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

const Information = styled.div`
  display: flex;
  padding: 1em;
  border: 1px solid #CCC;
  /* justify-content: space-between; */
`;

const MyButtons = styled.div`
  
  button {
    margin-right: 0.8em;
    border: 1px solid #FFF;
    background-color: #FFF;
    color: #979797;
  }
`;

const BasicProfileImage = styled.div`
  width: 5em;
  height: 5em;
  background: url('https://user-images.githubusercontent.com/104769120/203972344-e8de6516-2d57-4afd-b1ef-63a7471f3e5a.png');
  background-size: cover;
  border-radius: 50%;
`;

const ActivityInformation = styled.div`
  /* border: 1px solid #CCC; */
  /* height: 400px; */
`;

const ProfileImage = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 3em;
`;

const BasicInformation = styled.section`
  margin-left: 1em;
  align-self: center;
`;

const ProfileEditForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const ManagementButton = styled.div`
  width: 24px;
  height: 24px;
  background: url('https://user-images.githubusercontent.com/104769120/204442213-a385d246-7e38-4f71-8a4c-98ead588c53a.png');
  background-size: cover;
  cursor: pointer;
`;

const ProfileEditButton = styled.button`
  border: 1px solid #FFF;
  background-color: #FFF;
  margin-left: 27em;
`;

const PostNumber = styled.span`
  margin-right: 1em;
`;

export default function User({
  myInformation, changeComponentState, componentState, navigate,
  deleteCheckedPost, deleteCheckedComment, deleteCheckedRecomment, cancelCheckedPost, edits,
}) {
  const handleClickComponentState = (e) => {
    changeComponentState(e.target.innerText);
  };

  const handleClickProfileUpdate = () => {
    edits.changeEditState();
  };

  const handleClickManage = () => {
    navigate('/');
  };

  const handleClickApplication = () => {
    navigate('/levelup');
  };

  if (Object.keys(myInformation).length === 0) {
    return (
      <p>정보를 불러오는 중 입니다..</p>
    );
  }
  return (
    <Container>
      <Information>
        <div>
          {myInformation.user.profileImage === null ? (
            <BasicProfileImage />
          ) : (
            <ProfileImage src={myInformation.user.profileImage} alt="userProfileImage" />
          )}
        </div>
        {myInformation.user.grade === '매니저' ? (
          <ManagementButton onClick={handleClickManage} />
        ) : (
          null
        )}
        <BasicInformation>
          <p>{myInformation.user.name}</p>
          <PostNumber>
            작성글 수
            {' '}
            {myInformation.posts.length}
          </PostNumber>
          <span>
            작성 댓글 수
            {' '}
            {myInformation.comments.filter((comment) => comment.deleted === false).length
            + myInformation.recomments.length}
          </span>
        </BasicInformation>
        <ProfileEditForm>
          {edits.isUpdate ? (
            <UserProfileEditForm
              edits={edits}
            />
          ) : (
            null
          )}
          {myInformation.user.isMyToken ? (
            <>
              <ProfileEditButton type="button" onClick={handleClickProfileUpdate}>프로필 수정</ProfileEditButton>
              <button type="button" onClick={handleClickApplication}>등업 신청하기</button>
            </>
          ) : (
            null
          )}
        </ProfileEditForm>
      </Information>
      <MyButtons>
        <button type="button" onClick={handleClickComponentState}>작성글</button>
        <button type="button" onClick={handleClickComponentState}>작성 댓글</button>
        <button type="button" onClick={handleClickComponentState}>좋아요한 글</button>
      </MyButtons>
      <ActivityInformation>
        {componentState === '작성글' ? (
          <WrittenPosts
            myInformation={myInformation}
            navigate={navigate}
            deleteCheckedPost={deleteCheckedPost}
          />
        ) : componentState === '작성 댓글' ? (
          <WrittenComments
            myInformation={myInformation}
            navigate={navigate}
            deleteCheckedComment={deleteCheckedComment}
            deleteCheckedRecomment={deleteCheckedRecomment}
          />
        ) : componentState === '좋아요한 글' ? (
          <LikedPosts
            myInformation={myInformation}
            navigate={navigate}
            cancelCheckedPost={cancelCheckedPost}
          />
        ) : null}
      </ActivityInformation>
    </Container>
  );
}
