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
    const [basicInfo, setBasicInfo] = useState("");
    const [assetStatus, setAssetStatus] = useState("");
    const [profitStatus, setProfitStatus] = useState("");
    const [assetComposition, setAssetComposition] = useState("");
    const [answer, setAnswer] = useState("");

    const submitData = (data, fetchAnswer = false) => {
        if (data.trim() === "") {
            alert("입력을 완료해주세요.");
            return Promise.reject("입력을 완료해주세요.");
        }

        return fetch(`http://localhost:8080/chat?message=${encodeURIComponent(data)}`, {
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
            });
    };

    return (
        <Container>
            <InnerContainer>
                <SideBarContainer mainTitle={"ForAssetManager"} ButtonBackGroundColor={"#69D2BF"} />
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
            </InnerContainer>
        </Container>
    );
}

export default ManagerPage;
