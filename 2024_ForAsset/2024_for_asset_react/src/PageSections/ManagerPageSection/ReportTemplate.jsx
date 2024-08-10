import React, { useRef } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import icon from '../../../src/assets/images/icon.PNG';
import kblogo from '../../../src/assets/images/KBlogo.jfif';

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
    margin-top: 20px;
    &:hover {
        background-color: #333;
    }
`;

const ReportContainer = styled.div`
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    font-family: "NanumBarunGothic";
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
    min-height: 297mm; /* 최소 높이 A4 사이즈로 설정 */
`;

const FooterContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);

    & > hr {
        width: 100%;
        margin-bottom: 10px;
    }
    & span {
        text-align: left; /* 텍스트를 왼쪽 정렬로 설정 */
        display: flex;
        align-items: center;
    }
    .footer-logo {
        text-align: right;
        margin-top: 10px;
    }
    .footer-logo img {
        height: 50px; /* 로고 크기 조정 */
        width: auto;
    }
`;

const Template1 = styled(ReportContainer)`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 2px solid #e6e6e6;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .title-group {
        display: flex;
        flex-direction: column;
    }
    .header h1 {
        margin: 0;
        font-size: 32px;
        color: #726350;
    }
    .report-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .report-title .period {
        display: flex;
        align-items: center;
        background-color: #726350;
        color: #fff;
        padding: 3px 10px;
        border-radius: 15px;
        font-size: 15px;
        margin-right: 10px;
    }
    .report-title .period span {
        background-color: #e0a423;
        padding: 3px 10px;
        border-radius: 15px;
        margin-left: 10px;
        width: 300px;
    }
    .report-title .report {
        font-size: 30px;
        color: #e0a423;
    }
    .report-icon {
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .report-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .icon-image {
        margin-top: 20px;
        width: 100%;
        height: auto;
    }
`;

const Template2 = styled(ReportContainer)`
    .header {
        text-align: center;
        border-bottom: 2px solid #e6e6e6;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    .header .title {
        font-size: 20px;
        font-weight: bold;
        color: #ff8c00;
    }
    .header .fund-title {
        font-size: 18px;
        color: #726350;
    }
    .summary-section {
        margin-top: 10px;
    }
    .summary-section h2 {
        font-size: 18px;
        color: #726350;
        margin-bottom: 5px;
    }
    .performance-section {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .performance-section > div {
        width: 48%;
    }
    .performance-summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f9f9f9;
        padding: 10px;
        border: 1px solid #ddd;
        margin-top: 10px;
    }
    .performance-summary .left {
        width: 60%;
    }
    .performance-summary .right {
        text-align: right;
        width: 40%;
    }
    .performance-summary .performance-value {
        font-size: 26px;
        color: #e0a423;
    }
    table {
        font-size: 11px;
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    th {
        background-color: #90877E;
        color: white;
    }
    .footer-logo img {
        height: 40px;
        width: auto;
    }
`;

const Template3 = styled(ReportContainer)`
    .header {
        text-align: center;
        border-bottom: 2px solid #e6e6e6;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    .header .title {
        font-size: 20px;
        font-weight: bold;
        color: #ff8c00;
    }
    .header .fund-title {
        font-size: 18px;
        color: #726350;
    }
    .content h1 {
        font-size: 16px;
        color: #333;
        margin-top: 0;
    }
    .content h2 {
        font-size: 14px;
        color: #726350;
        margin-bottom: 5px;
    }
    .content p {
        font-size: 12px;
        color: #333;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
        margin-bottom: 10px;
    }
    .section-title {
        font-size: 18px;
        color: #ff8c00;
        margin: 20px 0 10px;
        border-bottom: 2px solid #ff8c00;
        padding-bottom: 5px;
    }
    th,
    td {
        border: 1px solid #ddd;
        padding: 4px;
        text-align: left;
    }
    th {
        background-color: #90877E;
        color: white;
    }
    .footer-logo img {
        height: 40px;
        width: auto;
    }
`;

const Template4 = styled(ReportContainer)`
    .header {
        text-align: center;
        border-bottom: 2px solid #e6e6e6;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    .header .title {
        font-size: 20px;
        font-weight: bold;
        color: #ff8c00;
    }
    .header .fund-title {
        font-size: 18px;
        color: #726350;
    }
    .content h1 {
        font-size: 16px;
        color: #333;
        margin-top: 0;
    }
    .content h2 {
        font-size: 14px;
        color: #726350;
        margin-bottom: 5px;
    }
    .content p {
        font-size: 12px;
        color: #333;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
        margin-bottom: 10px;
    }
    th,
    td {
        border: 1px solid #ddd;
        padding: 4px;
        text-align: left;
    }
    th {
        background-color: #90877E;
        color: white;
    }
    .footer-logo img {
        height: 40px;
        width: auto;
    }
`;

const ReportTemplate = ({ data }) => {
    const reportRef1 = useRef();
    const reportRef2 = useRef();
    const reportRef3 = useRef();
    const reportRef4 = useRef();

    const handleDownloadPdf = async () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const addTemplateToPdf = async (ref, addPage = false) => {
            const input = ref.current;
            const canvas = await html2canvas(input, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
            });
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = 210;
            const pdfHeight = 297;
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            if (addPage) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);
        };

        await addTemplateToPdf(reportRef1);
        await addTemplateToPdf(reportRef2, true);
        await addTemplateToPdf(reportRef3, true);
        await addTemplateToPdf(reportRef4, true);

        pdf.save(`${data.fundName}-report.pdf`);
    };

    return (
        <Container>
            <div ref={reportRef1}>
                <Template1>
                    <div className="header">
                        <div className="title-group">
                            <h1>{data.fundName}</h1>
                        </div>
                    </div>
                    <div className="report-title">
                        <div className="period">
                            운용 기간 <span>{data.operationPeriod}</span>
                        </div>
                        <div className="report">
                            자산운용 보고서
                        </div>
                    </div>
                    <div className="report-icon">
                        <img src={icon} alt="Report Icon" />
                    </div>
                    <FooterContainer>
                        <div className="footer-content">
                            <span>이 상품은 투자신탁입니다. 단위채권형이며, <br/>다양한 만기와 수익률 선택이 가능한 증권형 펀드입니다.</span>
                            <span>자산운용보고서는 자본시장과 금융투자업에 관한 법률에 의거 자산운용사가 작성하며, <br/>투자자가 가입한 금융 상품의 투자행위가 종료된 후 3개월 이내의 자산운용에 대한 결과를 요약하여 작성하는 보고서입니다.</span>
                        </div>
                        <hr color="#e0a423" size="5" />
                        <div className="footer-logo">
                            <img src={kblogo} alt="KB 자산운용 로고" />
                        </div>
                    </FooterContainer>
                </Template1>
            </div>

            <div ref={reportRef2}>
                <Template2>
                    <div className="header">
                        <div className="title">KB Asset Management Fund Report</div>
                        <div className="fund-title">{data.fundName}</div>
                    </div>
                    <div className="summary-section">
                        <h2>펀드개요</h2>
                        <p>{data.investmentObjective}</p>
                        <table>
                            <thead>
                            <tr>
                                <th>설정일</th>
                                <th>신탁수수료</th>
                                <th>운용규모</th>
                                <th>판매방법</th>
                                <th>비교지수(BM)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{data.settingDate}</td>
                                <td>{data.trustFee}</td>
                                <td>{data.operationSize}</td>
                                <td>{data.salesMethod}</td>
                                <td>{data.benchmark}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="summary-section">
                        <h2>펀드운용성과</h2>
                        <div className="performance-summary">
                            <div className="left">
                                <p>펀드는 지난 3개월 동안 {data.period3M}%의 운용성과를 달성하였습니다.</p>
                            </div>
                            <div className="right">
                                <div>{data.operationPeriod}</div>
                                <div className="performance-value">{data.period3M}%</div>
                                <div>비교지수(BM): {data.bmPeriod3M}%</div>
                            </div>
                        </div>
                        <div className="performance-section">
                            <div>
                                <h3>누적수익률</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>3개월</th>
                                        <th>6개월</th>
                                        <th>1년</th>
                                        <th>3년</th>
                                        <th>5년</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>펀드</td>
                                        <td>{data.period3M}</td>
                                        <td>{data.period6M}</td>
                                        <td>{data.period1Y}</td>
                                        <td>{data.period3Y}</td>
                                        <td>{data.period5Y}</td>
                                    </tr>
                                    <tr>
                                        <td>BM</td>
                                        <td>{data.bmPeriod3M}</td>
                                        <td>{data.bmPeriod6M}</td>
                                        <td>{data.bmPeriod1Y}</td>
                                        <td>{data.bmPeriod3Y}</td>
                                        <td>{data.bmPeriod5Y}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3>연도별 수익률</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>2021년</th>
                                        <th>2022년</th>
                                        <th>2023년</th>
                                        <th>2024년</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>펀드</td>
                                        <td>{data.return2021}%</td>
                                        <td>{data.return2022}%</td>
                                        <td>{data.return2023}%</td>
                                        <td>{data.return2024}%</td>
                                    </tr>
                                    <tr>
                                        <td>BM</td>
                                        <td>{data.benchmarkReturn2018}</td>
                                        <td>{data.benchmarkReturn2019}</td>
                                        <td>{data.benchmarkReturn2020}</td>
                                        <td>{data.benchmarkReturn2021}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <FooterContainer>
                        <hr color="#e0a423" size="5" />
                        <div className="footer-logo">
                            <img src={kblogo} alt="KB 자산운용 로고" />
                        </div>
                    </FooterContainer>
                </Template2>
            </div>

            <div ref={reportRef3}>
                <Template3>
                    <div className="header">
                        <div className="title">KB Asset Management Fund Report</div>
                        <div className="fund-title">{data.fundName}</div>
                    </div>
                    <div className="content">
                        <h2 className="section-title">기본정보</h2>
                        <p>펀드의 기본사항을 확인하실 수 있습니다.</p>
                        <table className="table-extended">
                            <thead>
                            <tr>
                                <th>펀드명</th>
                                <th>금융투자협회 펀드코드</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.classPriceStatusList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fundName}</td>
                                    <td>{item.className}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <table className="table-extended">
                            <tbody>
                            <tr>
                                <th>펀드의 종류</th>
                                <td colSpan="3">주식형, 혼합형(채권혼합형, 주가연계형, 종류형, 모자형)</td>
                            </tr>
                            <tr>
                                <th>위험등급</th>
                                <td>{data.riskLevel}</td>
                                <th>종류(클래스)</th>
                                <td>해당사항 없음</td>
                            </tr>
                            <tr>
                                <th>설정일</th>
                                <td>{data.settingDate}</td>
                                <th>운용기간</th>
                                <td>{data.operationPeriod}</td>
                            </tr>
                            <tr>
                                <th>기준가격</th>
                                <td>운용기간 동안 업데이트 됩니다.</td>
                                <th>판매회사</th>
                                <td>KB자산운용</td>
                            </tr>
                            <tr>
                                <th>환매수수료</th>
                                <td>없음</td>
                                <th>운용보수</th>
                                <td>자문형</td>
                            </tr>
                            <tr>
                                <th>펀드판매회사</th>
                                <td>중앙신용협동조합 (HSBC은행)</td>
                                <th>운용사</th>
                                <td>KB자산운용</td>
                            </tr>
                            <tr>
                                <th>상환일</th>
                                <td>운용기간 종료 후 6개월 이내</td>
                                <th>자산운용</th>
                                <td>자본시장과 금융투자업에 관한 법률</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <FooterContainer>
                        <hr color="#e0a423" size="5" />
                        <div className="footer-logo">
                            <img src={kblogo} alt="KB 자산운용 로고" />
                        </div>
                    </FooterContainer>
                </Template3>
            </div>

            <div ref={reportRef4}>
                <Template4>
                    <div className="header">
                        <div className="title">KB Asset Management Fund Report</div>
                        <div className="fund-title">{data.fundName}</div>
                    </div>
                    <div className="content">
                        <h2 className="section-title">재산현황</h2>
                        <p>펀드의 당기/말기 전기/말 순자산 총액 및 기준가격 증감을 비교하실 수 있습니다.</p>
                        <table>
                            <thead>
                            <tr>
                                <th>펀드명</th>
                                <th>당기말</th>
                                <th>전기말</th>
                                <th>증감율</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.marketStatusList.map((marketStatus, index) => (
                                <>
                                    <tr key={`${index}-1`}>
                                        <td>자산총액</td>
                                        <td>{marketStatus.assetTotal}</td>
                                        <td>{marketStatus.assetPrevious}</td>
                                        <td>{marketStatus.growthRateAsset}</td>
                                    </tr>
                                    <tr key={`${index}-2`}>
                                        <td>부채총액</td>
                                        <td>{marketStatus.debtPrevious}</td>
                                        <td>{marketStatus.debtTotal}</td>
                                        <td>{marketStatus.growthRateDebt}</td>
                                    </tr>
                                    <tr key={`${index}-3`}>
                                        <td>순자산총액</td>
                                        <td>{marketStatus.netAssetTotal}</td>
                                        <td>{marketStatus.netAssetPrevious}</td>
                                        <td>{marketStatus.growthRateNetAsset}</td>
                                    </tr>
                                    <tr key={`${index}-4`}>
                                        <td>기준가격</td>
                                        <td>{marketStatus.standardPriceCurrent}</td>
                                        <td>{marketStatus.standardPricePrevious}</td>
                                        <td>{marketStatus.growthRateStandardPrice}</td>
                                    </tr>
                                </>
                            ))}
                            </tbody>
                        </table>
                        <h2 className="section-title">KB Asset Management Fund Report</h2>
                        <table>
                            <thead>
                            <tr>
                                <th colSpan="2">종류(Class)</th>
                                <th>전기말</th>
                                <th>당기말</th>
                                <th>증감율</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.classPriceStatusList.map((fund, index) => (
                                <tr key={index}>
                                    <td colSpan="2">{fund.fundName}</td>
                                    <td>{fund.previousPrice}</td>
                                    <td>{fund.currentPrice}</td>
                                    <td>{fund.changePercentage}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <h2 className="section-title">02. 운용결과 및 수익률 현황</h2>
                        <h2>운용성과와 투자환경 및 운용계획</h2>
                        <p>최근 시장 현황 및 향후 펀드 운용 계획에 대한 매니저의 코멘트 입니다.</p>
                        <table>
                            <thead>
                            <tr>
                                <th>시장 현황 및 운용결과</th>
                                <th>향후 운용계획</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div>{data.planDetails}</div>
                                </td>
                                <td>
                                    <div>{data.commentary}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <FooterContainer>
                        <hr color="#e0a423" size="5" />
                        <div className="footer-logo">
                            <img src={kblogo} alt="KB 자산운용 로고" />
                        </div>
                    </FooterContainer>
                </Template4>
            </div>

            <DownloadButton onClick={handleDownloadPdf}>
                PDF 다운로드
            </DownloadButton>
        </Container>
    );
};

export default ReportTemplate;
