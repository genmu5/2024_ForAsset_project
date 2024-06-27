import React from "react";
import styled from "styled-components";
import SideBarListContainer from "./SideBarListContainer";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const NewChatButton = ({ButtonBackGroundColor, onClick }) => {
    return(
      <Container
          style={{backgroundColor: ButtonBackGroundColor}}
          onClick={SideBarListContainer.addNewChat}>

          <p style={{ fontSize: 18,    textAlign: "left", color: "#fff" }}> + New Chat</p>
      </Container>
    );
}

export default NewChatButton;