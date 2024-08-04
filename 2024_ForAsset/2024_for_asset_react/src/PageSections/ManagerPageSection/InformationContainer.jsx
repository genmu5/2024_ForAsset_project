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
`;

const AnswerContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    white-space: pre-wrap; /* This preserves the formatting of the text */
`;

const AnswerTitle = styled.p`
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 20px;
`;

const ReportContainer = ({ answer }) => {
    return (
        <Container>
            <h2 style={{fontSize: "18px", fontWeight: "bold", color: "gray"}}>Report</h2>
            {answer && (
                <AnswerContainer>
                    <AnswerTitle>운용보고 작성완료</AnswerTitle>
                    <p>{answer}</p>
                </AnswerContainer>
            )}
        </Container>
    );
}

export default ReportContainer;
