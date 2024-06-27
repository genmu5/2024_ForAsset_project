import React from "react";
import styled from "styled-components";
import message_icon from "../images/message_icon.png";
import trash_icon from "../images/trash_icon.png";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 2px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%);
`;

const Text = styled.p`
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    text-align: left;
    color: #fff;
`;

const SideBarListComponent = ({ content }) => {
    return (
        <Container>
            <ListContainer>
                <Icon src={message_icon} alt={"message_icon"} />
                <Text>{content}</Text>
            </ListContainer>
            <Icon src={trash_icon} alt={"trash_icon"} style={{width: "23px", height: "23px"}}/>
        </Container>
    );
}

export default SideBarListComponent;
