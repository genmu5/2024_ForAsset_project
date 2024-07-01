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
`;

const InformationContainer = ({ question, setQuestion, fetchAnswer }) => {

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    return (
        <Container>
            <TitleComponent title={"Fund Info"} />
            <h2>펀드 개요</h2>
            <textarea
                placeholder="질문을 입력하세요..."
                value={question}
                onChange={handleQuestionChange}
                rows={5}
                cols={50}
            />
            <button onClick={fetchAnswer}>질문하기</button>
        </Container>
    );
}

export default InformationContainer;
