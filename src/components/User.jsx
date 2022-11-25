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
  border: 1px solid #CCC;
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

const PostNumber = styled.span`
  margin-right: 1em;
`;

export default function User({
  myInformation, changeComponentState, componentState, navigate,
  deleteCheckedPost, deleteCheckedComment, deleteCheckedRecomment, edits,
}) {
  const handleClickComponentState = (e) => {
    changeComponentState(e.target.innerText);
  };

  const handleClickProfileUpdate = () => {
    edits.changeEditState();
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
          <ProfileImage src={myInformation.user.profileImage} alt="userProfileImage" />
        </div>
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
        <div>
          {edits.isUpdate ? (
            <UserProfileEditForm
              edits={edits}
            />
          ) : (
            null
          )}
          {myInformation.user.isMyToken ? (
            <button type="button" onClick={handleClickProfileUpdate}>프로필 수정</button>
          ) : (
            null
          )}
        </div>
      </Information>
      <div>
        <button type="button" onClick={handleClickComponentState}>작성글</button>
        <button type="button" onClick={handleClickComponentState}>작성 댓글</button>
        <button type="button" onClick={handleClickComponentState}>좋아요한 글</button>
      </div>
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
          />
        ) : null}
      </ActivityInformation>
    </Container>
  );
}
