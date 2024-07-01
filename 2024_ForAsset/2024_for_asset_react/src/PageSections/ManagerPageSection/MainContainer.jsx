import React, { useState } from "react";
import InformationContainer from "./InformationContainer";
import ReportContainer from "./ReportContainer";

const MainContainer = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

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
                return response.text();
            })
            .then(data => {
                setAnswer(data);
            })
            .catch(error => {
                console.error('Error fetching answer:', error);
                setAnswer("서버에서 답변을 가져오는 중 오류가 발생했습니다.");
            });
    };

    return (
        <div>
            <InformationContainer
                question={question}
                setQuestion={setQuestion}
                fetchAnswer={fetchAnswer}
            />
            <ReportContainer answer={answer} />
        </div>
    );
}

export default MainContainer;
