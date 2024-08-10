import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Container = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DownloadButton = styled.button`
    background-color: #4A4A4A;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #333;
    }
`;

const ReportTemplate = styled.div`
    font-family: "NanumBarunGothic";
    color: #333;
    background-color: #f8f8f8;
    padding: 20mm;
    width: 210mm;
    height: 297mm;
    box-sizing: border-box;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    color: #777;
`;

const Content = styled.div`
    margin-top: 20px;
`;

const ReportContainer = ({ fundName, operationPeriod }) => {
    const [reportData, setReportData] = useState(null);
    const reportRef = useRef();

    useEffect(() => {
        // API를 호출하여 데이터를 가져옵니다.
        fetch(`/api/fund-report?fundName=${encodeURIComponent(fundName)}&operationPeriod=${encodeURIComponent(operationPeriod)}`)
            .then(response => response.json())
            .then(data => setReportData(data));
    }, [fundName, operationPeriod]);

    const handleDownloadPdf = () => {
        const element = reportRef.current;
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("fund-report.pdf");
        });
    };

    if (!reportData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <ReportTemplate ref={reportRef}>
                <Header>
                    <Title>{reportData.fundName} 운용 보고서</Title>
                    <SubTitle>운용 기간: {reportData.operationPeriod}</SubTitle>
                </Header>
                <Content>
                    <h3>펀드 개요</h3>
                    <p>설정일: {reportData.settingDate}</p>
                    <p>신탁수수료: {reportData.trustFee}</p>
                    <p>운용규모: {reportData.operationSize}</p>
                    <p>판매방법: {reportData.salesMethod}</p>
                    <p>비교지수(BM): {reportData.benchmark}</p>
                    <p>운용목표: {reportData.investmentObjective}</p>

                    <h3>펀드 운용 성과</h3>
                    <p>3개월 성과: {reportData.period3M}</p>
                    <p>6개월 성과: {reportData.period6M}</p>
                    <p>1년 성과: {reportData.period1Y}</p>
                    <p>비교지수(BM) 3개월 성과: {reportData.bmPeriod3M}</p>

                    <h3>운용 계획</h3>
                    <p>{reportData.planDetails}</p>

                    <h3>운용 결과</h3>
                    <p>{reportData.commentary}</p>
                </Content>
            </ReportTemplate>
            <DownloadButton onClick={handleDownloadPdf}>
                PDF 다운로드
            </DownloadButton>
        </Container>
    );
};

export default ReportContainer;
