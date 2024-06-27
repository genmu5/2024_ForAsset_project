import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    height: 50px;
`;

const NewChatButton = ({ButtonBackGroundColor}) => {
    return(
      <Container style={{backgroundColor: ButtonBackGroundColor}}>
            <p style={{ fontSize: 18,    textAlign: "left", color: "#fff" }}> + New Chat</p>
      </Container>
    );
}

export default NewChatButton;