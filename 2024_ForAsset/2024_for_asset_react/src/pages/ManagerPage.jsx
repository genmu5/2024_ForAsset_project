import React, { useState } from "react";
import styled from "styled-components";
import SideBarContainer from "../components/SideBarContainer";
import InformationContainer from "../PageSections/ManagerPageSection/InformationContainer";
import ReportContainer from "../PageSections/ManagerPageSection/ReportContainer";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerContainer = styled.div`
    display: flex;
    width: calc(100vw - 80px); /* 100% width minus left and right margins */
    height: calc(100vh - 80px); /* 100% height minus top and bottom margins */
    margin: 20px;
    background-color: #2C4792;
    border-radius: 26px;
    gap: 20px;
    padding: 20px;
`;

const ManagerPage = () => {
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
        <Container>
            <InnerContainer>
                <SideBarContainer mainTitle={"ForAssetManager"} ButtonBackGroundColor={"#69D2BF"} />
                <InformationContainer
                    question={question}
                    setQuestion={setQuestion}
                    fetchAnswer={fetchAnswer}
                />
                <ReportContainer answer={answer} />
            </InnerContainer>
        </Container>
    );
}

export default ManagerPage;
