import React, { useState } from "react";
import InformationContainer from "./InformationContainer";
import ReportContainer from "./ReportContainer";

const MainContainer = () => {
    const [basicInfo, setBasicInfo] = useState("");
    const [assetStatus, setAssetStatus] = useState("");
    const [profitStatus, setProfitStatus] = useState("");
    const [assetComposition, setAssetComposition] = useState("");
    const [answer, setAnswer] = useState("");

    const submitData = (data, fetchAnswer = false) => {
        if (data.trim() === "") {
            alert("입력을 완료해주세요.");
            return;
        }

        fetch(`http://localhost:8080/chat?message=${encodeURIComponent(data)}`, {
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
                if (fetchAnswer) {
                    setAnswer(data);
                }
            })
            .catch(error => {
                console.error('Error submitting data:', error);
                if (fetchAnswer) {
                    setAnswer("서버에서 답변을 가져오는 중 오류가 발생했습니다.");
                }
            });
    };

    return (
        <div>
            <InformationContainer
                basicInfo={basicInfo}
                setBasicInfo={setBasicInfo}
                assetStatus={assetStatus}
                setAssetStatus={setAssetStatus}
                profitStatus={profitStatus}
                setProfitStatus={setProfitStatus}
                assetComposition={assetComposition}
                setAssetComposition={setAssetComposition}
                submitData={submitData}
            />
            <ReportContainer answer={answer} />
        </div>
    );
}

export default MainContainer;
