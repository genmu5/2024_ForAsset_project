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
    overflow-x: hidden; /* Prevent horizontal scrolling */
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

const Message = styled.p`
    margin-top: 20px;
    font-size: 16px;
    color: green;
`;

const InformationContainer = ({ title, onTitleChange, fundName, setFundName, period, setPeriod, onComplete }) => {
    const [message, setMessage] = useState("");

    const handleCompleteClick = () => {
        fetch('/api/generateReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                fundName,
                period,
            }),
        })
            .then(response => response.json())
            .then(data => {
                onComplete(data.report);
                setMessage("보고서 생성을 완료했습니다!");
            })
            .catch(error => {
                console.error('Error generating report:', error);
                setMessage("보고서 생성 중 오류가 발생했습니다.");
            });
    };

    return (
        <Container>
            <TitleInput
                type="text"
                placeholder="Title 입력란 입니다. 임의로 작성했어요. 여기에 채팅 제목을 입력할 예정입니다."
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
                placeholder="펀드 운용 기간"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
            />
            <CompleteButton onClick={handleCompleteClick}>Complete</CompleteButton>
            {message && <Message>{message}</Message>}
        </Container>
    );
};

export default InformationContainer;
