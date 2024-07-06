import React from "react";
import styled from "styled-components";
import userProfile from '../images/user_profile.png';
import settingsIcon from '../images/settings_icon.png';

const UserProfileContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white; /* 배경색상을 흰색으로 설정 */
    border-radius: 26px; /* 둥근 모서리 설정 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    width: calc(100% - 20px); /* 가로 길이를 조정하여 부모 요소의 100%에 맞춤 */
`;

const UserProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserName = styled.span`
    flex-grow: 1;
    color: black; /* 텍스트 색상을 검은색으로 설정 */
`;

const SettingsIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const UserProfile = () => (
    <UserProfileContainer>
        <UserProfileImage src={userProfile} alt="user_profile" />
        <UserName>Username</UserName>
        <SettingsIcon src={settingsIcon} alt="settings_icon" />
    </UserProfileContainer>
);

export default UserProfile;
