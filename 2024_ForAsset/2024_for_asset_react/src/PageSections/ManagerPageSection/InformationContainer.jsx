import React, { useState } from "react";
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
    overflow-x: hidden;
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    text-align: center;
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

const KeywordInput = styled.input`
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
    margin-top: 10px;
    &:hover {
        background-color: #333;
    }
`;

const InformationContainer = ({ title, onTitleChange, fundName, setFundName, period, setPeriod, keyword, setKeyword, onComplete }) => {
    return (
        <Container>
            <TitleInput
                type="text"
                placeholder="Title 입력란 입니다."
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
            />
            <FundInput
                type="text"
                placeholder="펀드명"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
            />
            <PeriodInput
                type="text"
                placeholder="펀드 운용 기간 (예: 2024.03.01~2024.03.09)"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
            />
            <KeywordInput
                type="text"
                placeholder="키워드"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <CompleteButton onClick={() => onComplete(fundName, period)}>
                운용 보고서 생성
            </CompleteButton>
        </Container>
    );
};

export default InformationContainer;
