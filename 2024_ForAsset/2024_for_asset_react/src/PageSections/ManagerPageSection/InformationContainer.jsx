import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    align-items: center;
    flex-direction: column;
    display: flex;
    width: 60%;
    background-color: white;
    border-radius: 26px;
    padding: 20px;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    resize: vertical;
    &:focus {
        outline: none;
        border-color: #69D2BF;
        box-shadow: 0 0 10px #69D2BF;
    }
`;

const StyledButton = styled.button`
    background-color: #69D2BF;
    color: white;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background-color: #57B9A6;
    }
`;

const InformationContainer = ({ question, setQuestion, fetchAnswer }) => {

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    return (
        <Container>
            <TitleComponent title={"Fund Info"} />
            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>펀드개요 - 펀드 기본정보</h2>
            <StyledTextarea
                placeholder="펀드 기본정보를 입력하세요..."
                value={question}
                onChange={handleQuestionChange}
                rows={10}
            />
            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>펀드개요 - 재산현황</h2>
            <StyledTextarea
                placeholder="펀드 재산현황을 입력하세요..."
                value={question}
                onChange={handleQuestionChange}
                rows={10}
            />
            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>수익률 현황 - 기간수익률</h2>
            <StyledTextarea
                placeholder="수익률 현황 기간 수익률을 입력하세요..."
                value={question}
                onChange={handleQuestionChange}
                rows={10}
            />
            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>자산 현황 - 자산 구성현황</h2>
            <StyledTextarea
                placeholder="자산 구성현황을 입력하세요..."
                value={question}
                onChange={handleQuestionChange}
                rows={10}
            />
            <StyledButton onClick={fetchAnswer}>create</StyledButton>
        </Container>
    );
}

export default InformationContainer;
