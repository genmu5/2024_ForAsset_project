import React from "react";
import styled from "styled-components";
import TitleComponent from "./TitleComponent";
import NewChatButton from "./NewChatButton";
import SideBarListContainer from "./SideBarListContainer";

const Container = styled.div`
    display: flex;
    width: 40%;
    height: 100%;
    border-radius: 26px;
    flex-direction: column;
    gap: 10px;
`;

const MainTitle = styled.div`
    font-size: 35px;
    font-weight: bold;
    color: white;
`;

const SideBarContainer = ({mainTitle, ButtonBackGroundColor}) => {
    return (
        <Container>
            <TitleComponent mainTitle={mainTitle}/>
            <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor}/>
            <SideBarListContainer/>
        </Container>
    );
}

export default SideBarContainer;