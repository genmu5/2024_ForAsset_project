import React, { useState } from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
`;

const ReportContainer = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const fetchAnswer = () => {
        if (question.trim() === "") {
            alert("질문을 입력해주세요.");
            return;
        }

        fetch(`http://localhost:8080/chat?message=${encodeURIComponent(question)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // 응답을 텍스트로 받아서 처리
            })
            .then(data => {
                setAnswer(data); // 응답 텍스트를 상태로 설정
            })
            .catch(error => {
                console.error('Error fetching answer:', error);
                setAnswer("서버에서 답변을 가져오는 중 오류가 발생했습니다.");
            });
    };

    return (
        <Container>
            <TitleComponent title={"Chat with GPT"} />
            <textarea
                placeholder="질문을 입력하세요..."
                value={question}
                onChange={handleQuestionChange}
                rows={5}
                cols={50}
            />
            <button onClick={fetchAnswer}>질문하기</button>
            {answer && (
                <div>
                    <p>답변:</p>
                    <p>{answer}</p>
                </div>
            )}
        </Container>
    );
}

export default ReportContainer;
