import React from "react";
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
`;

const FundInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
`;

const PeriodInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
`;

const CompleteButton = styled.button`
    background-color: #4A4A4A;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
        background-color: #333;
    }
`;

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
`;

const SendButton = styled.button`
    background-color: #4A4A4A;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #333;
    }
`;

const InformationContainer = ({ onSendMessage, message, setMessage, title, onTitleChange, fundName, setFundName, period, setPeriod, onComplete }) => {
    return (
        <Container>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "gray" }}>Information</h2>
            <TitleInput
                type="text"
                placeholder="Enter chat title..."
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
            />
            <FundInput
                type="text"
                placeholder="Enter fund name..."
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
            />
            <PeriodInput
                type="text"
                placeholder="Enter period..."
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
            />
            <CompleteButton onClick={onComplete}>Complete</CompleteButton>
            <InputContainer>
                <ChatInput
                    type="text"
                    placeholder="What's in your mind?..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendButton onClick={onSendMessage}>Send</SendButton>
            </InputContainer>
        </Container>
    );
}

export default InformationContainer;
