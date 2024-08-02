import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    height: 45px;
    cursor: pointer; // Change cursor to pointer
    // transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
        transform: scale(1.01); // Scale on hover
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Shadow on hover
    }
`;

const NewChatButton = ({ ButtonBackGroundColor, onClick }) => { //'+ New Chat' button
    return (
        <Container
            style={{ backgroundColor: ButtonBackGroundColor }}
            onClick={onClick}>
            <p style={{ fontSize: 18, textAlign: "left", color: "#fff" }}> + New Chat</p>
        </Container>
    );
}

export default NewChatButton;
