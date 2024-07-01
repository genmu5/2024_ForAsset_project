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

const InformationContainer = ({
                                  basicInfo, setBasicInfo,
                                  assetStatus, setAssetStatus,
                                  profitStatus, setProfitStatus,
                                  assetComposition, setAssetComposition,
                                  submitData
                              }) => {

    const handleBasicInfoChange = (e) => {
        setBasicInfo(e.target.value);
    };

    const handleAssetStatusChange = (e) => {
        setAssetStatus(e.target.value);
    };

    const handleProfitStatusChange = (e) => {
        setProfitStatus(e.target.value);
    };

    const handleAssetCompositionChange = (e) => {
        setAssetComposition(e.target.value);
    };

    const handleSubmitBasicInfo = () => {
        submitData(basicInfo, false)
            .then(() => alert("기본 정보가 성공적으로 전송되었습니다."))
            .catch(() => alert("기본 정보 전송에 실패했습니다."));
    };

    const handleSubmitAssetStatus = () => {
        submitData(assetStatus, false)
            .then(() => alert("재산 현황이 성공적으로 전송되었습니다."))
            .catch(() => alert("재산 현황 전송에 실패했습니다."));
    };

    const handleSubmitProfitStatus = () => {
        submitData(profitStatus, false)
            .then(() => alert("기간 수익률이 성공적으로 전송되었습니다."))
            .catch(() => alert("기간 수익률 전송에 실패했습니다."));
    };

    const handleSubmitAssetComposition = () => {
        const dataWithExtraString = assetComposition + "\n\n앞에 보냈던 펀드기본정보, 재산현황, 기간수익률과 지금보내는 자산구성현황의 정보를 가지고 많은 내용의 운용보고 작성해줘 ";
        submitData(dataWithExtraString, true)
    };

    return (
        <Container>
            <TitleComponent title={"Fund Info"} />
            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>펀드개요 - 펀드 기본정보</h2>
            <StyledTextarea
                placeholder="펀드 기본정보를 입력하세요..."
                value={basicInfo}
                onChange={handleBasicInfoChange}
                rows={10}
            />
            <StyledButton onClick={handleSubmitBasicInfo}>Checking Basic Info</StyledButton>

            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>펀드개요 - 재산현황</h2>
            <StyledTextarea
                placeholder="펀드 재산현황을 입력하세요..."
                value={assetStatus}
                onChange={handleAssetStatusChange}
                rows={10}
            />
            <StyledButton onClick={handleSubmitAssetStatus}>Checking Asset Status</StyledButton>

            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>수익률 현황 - 기간수익률</h2>
            <StyledTextarea
                placeholder="수익률 현황 기간 수익률을 입력하세요..."
                value={profitStatus}
                onChange={handleProfitStatusChange}
                rows={10}
            />
            <StyledButton onClick={handleSubmitProfitStatus}>Checking Profit Status</StyledButton>

            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "gray", padding: "10px"}}>자산 현황 - 자산 구성현황</h2>
            <StyledTextarea
                placeholder="자산 구성현황을 입력하세요..."
                value={assetComposition}
                onChange={handleAssetCompositionChange}
                rows={10}
            />
            <StyledButton onClick={handleSubmitAssetComposition}>Create</StyledButton>
        </Container>
    );
}

export default InformationContainer;
