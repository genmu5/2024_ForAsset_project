import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: white;
    border-radius: 26px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AnswerContainer = styled.div`
    margin-top: 20px;
    width: 90%;
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
            <TitleComponent title={"Report"} />
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
