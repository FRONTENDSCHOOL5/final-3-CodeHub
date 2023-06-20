import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { setToken } from '../../Atom/atom';
import { useNavigate } from 'react-router-dom';
import { AddFollow, DeleteFollow } from './FollowAddDelete';
import Button from '../Common/Button';
import styled from 'styled-components';

export default function FollowCard({ profile, isFollower }) {
  const navigate = useNavigate();
  const token = useRecoilValue(setToken);

  console.log(profile);

  const [isFollowing, setIsFollowing] = useState(true);
  function handleFollow(e) {
    const buttonContent = e.target.innerText;
    if (buttonContent === '팔로잉') {
      // 팔로워 제거
      DeleteFollow(profile.accountname, token)
        .then(() => {
          // 함수 호출 성공 시 실행될 코드
          console.log('삭제완');
          setIsFollowing(false);
        })
        .catch(error => {
          console.log(error);
          // 함수 호출 실패 시 실행될 코드
        });
    } else if (buttonContent === '팔로우') {
      AddFollow(profile.accountname, token)
        .then(() => {
          // 함수 호출 성공 시 실행될 코드
          console.log('추가완');
          setIsFollowing(true);
        })
        .catch(error => {
          console.log(error);
          // 함수 호출 실패 시 실행될 코드
        });
    }
  }

  return (
    <SFollowCard id={profile._id}>
      <SFollowContainer onClick={() => navigate('/myprofile', { state: profile })}>
        <SImage src={profile.image} alt={profile.username} />
        <STextContainer>
          <SUserName>{profile.username}</SUserName>
          <SAccountName>@ {profile.accountname}</SAccountName>
        </STextContainer>
      </SFollowContainer>

      <SBtnContainer>
        <Button
          width="80px"
          bgColor="var(--gray)"
          fontSize="12px"
          onClick={e => handleFollow(e, profile.accountname, token)}>
          {isFollower ? '삭제' : isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      </SBtnContainer>
    </SFollowCard>
  );
}

const SFollowCard = styled.div`
  box-shadow: inset 0px 0px 10px green;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SFollowContainer = styled.div`
  box-shadow: inset 0px 0px 10px green;
  display: flex;
  align-items: center;
`;

const SImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
`;

const STextContainer = styled.div`
  box-shadow: inset 0px 0px 10px green;
  margin-left: 12px;
`;

const SUserName = styled.p`
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--white);
`;

const SAccountName = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: var(--darkgray);
`;

const SBtnContainer = styled.div`
  box-shadow: inset 0px 0px 10px green;
`;
