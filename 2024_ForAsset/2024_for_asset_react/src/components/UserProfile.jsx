import React from "react";
import styled from "styled-components";
import userProfile from '../images/user_profile.png';

const UserProfileContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: transparent;
    border-radius: 10px;
    box-shadow: none;
    margin-right: 10px;
`;

const UserProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserName = styled.span`
    flex-grow: 1;
    color: #333;
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
        {/*<SettingsIcon src={settingsIcon} alt="settings_icon" />*/}
    </UserProfileContainer>
);

export default UserProfile;
