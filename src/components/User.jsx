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
`;

const MyButtons = styled.div`
  button {
    margin-right: 0.8em;
    border: 1px solid #FFF;
    background-color: #FFF;
    color: #979797;
  }

  button:hover {
    color: #000;
  }

  button:focus {
    color: #000;
  }
`;

const BasicProfileImage = styled.div`
  width: 6em;
  height: 6em;
  background: url('https://user-images.githubusercontent.com/104769120/203972344-e8de6516-2d57-4afd-b1ef-63a7471f3e5a.png');
  background-size: cover;
  border-radius: 50%;
`;

const ImageBox = styled.div`
  align-self: center;
`;

const ProfileImage = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 3em;
`;

const BasicInformation = styled.section`
  margin-left: 1em;
  align-self: center;
  width: 100%;

  p {
    margin-bottom: 0.5em;
  }
`;

const ProfileEditForm = styled.div`
  display: flex;
  width: 100%;
`;

const UpdateButtons = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;

  button {
    padding: .5em 1.3em;
  }
`;

const ProfileEditButton = styled.button`
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
        <ProfileEditForm>
          {edits.isUpdate ? (
            <UserProfileEditForm
              edits={edits}
              myInformation={myInformation}
            />
          ) : (
            <>
              <ImageBox>
                {myInformation.user.profileImage === null ? (
                  <BasicProfileImage />
                ) : (
                  <ProfileImage src={myInformation.user.profileImage} alt="userProfileImage" />
                )}
              </ImageBox>
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
              {myInformation.user.isMyToken ? (
                <UpdateButtons>
                  <ProfileEditButton type="button" onClick={handleClickProfileUpdate}>프로필 수정</ProfileEditButton>
                  <button type="button" onClick={handleClickApplication}>등업 신청하기</button>
                </UpdateButtons>
              ) : (
                null
              )}
            </>
          )}
        </ProfileEditForm>
      </Information>
      <MyButtons>
        <button type="button" onClick={handleClickComponentState}>작성글</button>
        <button type="button" onClick={handleClickComponentState}>작성 댓글</button>
        <button type="button" onClick={handleClickComponentState}>좋아요한 글</button>
      </MyButtons>
      <div>
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
      </div>
    </Container>
  );
}
