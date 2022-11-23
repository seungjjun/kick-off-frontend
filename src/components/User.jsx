/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

import LikedPosts from './LikedPosts';

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
  myInformation, changeComponentState, componentState, navigate, deletePost,
}) {
  const handleClickComponentState = (e) => {
    changeComponentState(e.target.innerText);
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
            {myInformation.comments.length}
          </span>
        </BasicInformation>
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
            deletePost={deletePost}
          />
        ) : componentState === '작성 댓글' ? (
          <WrittenComments
            myInformation={myInformation}
            navigate={navigate}
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
