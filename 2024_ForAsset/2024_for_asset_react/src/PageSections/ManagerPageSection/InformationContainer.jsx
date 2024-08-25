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
    overflow-x: hidden;
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

const KeywordInput = styled.input`
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
    margin-top: 10px;
    &:hover {
        background-color: #333;
    }
`;

const NewsListContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const NewsItem = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: ${props => props.isSelected ? "#d3f4ff" : "white"};
    box-shadow: ${props => props.isSelected ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none"};
    cursor: pointer;

    &:hover {
        background-color: #f0f8ff;
    }

    h3 {
        margin: 0;
        font-size: 18px;
    }

    p {
        margin: 10px 0;
        font-size: 14px;
    }

    small {
        font-size: 12px;
        color: #777;
    }
`;

const StyledResultItem = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-top: 10px;

    h3 {
        margin: 0;
        font-size: 18px;
    }

    p {
        margin: 10px 0;
        font-size: 14px;
    }
`;

const InformationContainer = ({ title, onTitleChange, fundName, setFundName, period, setPeriod, keyword, setKeyword, onComplete }) => {
    const [newsSummaries, setNewsSummaries] = useState([]);  // 전체 뉴스 리스트 상태
    const [selectedNewsIndices, setSelectedNewsIndices] = useState([]); // 선택된 뉴스 인덱스 상태 추가
    const [planMessage, setPlanMessage] = useState(""); // 운용 계획 메시지 상태 추가
    const [resultMessage, setResultMessage] = useState(""); // 운용 결과 메시지 상태 추가

    const handleCompleteClick = () => {
        // 기간을 '-' 형식으로 변환
        const [startDate, endDate] = period.split("~").map(date => {
            return date.trim().replace(/\./g, '-'); // '.'을 '-'로 변환
        });

        fetch(`/news-summaries?keyword=${encodeURIComponent(keyword)}&startDate=${encodeURIComponent(startDate)}T00:00:00&endDate=${encodeURIComponent(endDate)}T23:59:59`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(newsData => {
                setNewsSummaries(newsData); // 뉴스 데이터 설정
            })
            .catch(error => {
                console.error('뉴스 요약 가져오기 중 오류:', error);
            });
    };

    const handleNewsItemClick = (index) => {
        if (selectedNewsIndices.includes(index)) {
            setSelectedNewsIndices(selectedNewsIndices.filter(i => i !== index));
        } else {
            setSelectedNewsIndices([...selectedNewsIndices, index]);
        }
    };

    const handleGeneratePlanClick = () => {
        const selectedSummaries = newsSummaries.filter((_, index) => selectedNewsIndices.includes(index));

        const requestData = {
            fundName,
            operationPeriod: period,
            newsSummaries: selectedSummaries.map(summary => summary.summary),
        };

        fetch('http://localhost:8080/funds/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.text())
            .then(planDetails => {
                setPlanMessage(planDetails);
            })
            .catch(error => {
                console.error('운용 계획 생성 중 오류:', error);
                setPlanMessage("운용 계획 생성 중 오류가 발생했습니다.");
            });
    };

    const handleGenerateResultsClick = () => {
        const selectedSummaries = newsSummaries.filter((_, index) => selectedNewsIndices.includes(index));

        const requestData = {
            fundName,
            operationPeriod: period,
            newsSummaries: selectedSummaries.map(summary => summary.summary),
        };

        fetch('http://localhost:8080/funds/generate-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.text())
            .then(results => {
                setResultMessage(results);
            })
            .catch(error => {
                console.error('운용 결과 생성 중 오류:', error);
                setResultMessage("운용 결과 생성 중 오류가 발생했습니다.");
            });
    };

    const handleGenerateReportClick = () => {
        if (planMessage && resultMessage) {
            onComplete(fundName, period);
        } else {
            alert("운용 계획 및 결과를 먼저 생성하세요.");
        }
    };

    return (
        <Container>
            <TitleInput
                type="text"
                placeholder="Title 입력란 입니다."
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
                placeholder="펀드 운용 기간 (예: 2024.03.01~2024.03.09)"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
            />
            <KeywordInput
                type="text"
                placeholder="키워드"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <CompleteButton onClick={handleCompleteClick}>뉴스 요약 가져오기</CompleteButton>

            {newsSummaries.length > 0 && (
                <NewsListContainer>
                    {newsSummaries.map((summary, index) => (
                        <NewsItem
                            key={index}
                            isSelected={selectedNewsIndices.includes(index)}
                            onClick={() => handleNewsItemClick(index)}
                        >
                            <h3>{summary.title}</h3>
                            <p style={{lineHeight: "1.2"}}>{summary.summary}</p>
                            <small>{summary.publishedAt}</small>
                        </NewsItem>
                    ))}
                </NewsListContainer>
            )}

            <CompleteButton onClick={handleGeneratePlanClick}>운용 계획 생성</CompleteButton>
            {planMessage && (
                <StyledResultItem>
                    <h3>운용 계획</h3>
                    <p style={{lineHeight: "1.2"}}>{planMessage}</p>
                </StyledResultItem>
            )}

            <CompleteButton onClick={handleGenerateResultsClick}>운용 결과 생성</CompleteButton>
            {resultMessage && (
                <StyledResultItem>
                    <h3>운용 결과</h3>
                    <p style={{lineHeight: "1.2"}}>{resultMessage}</p>
                </StyledResultItem>
            )}

            <CompleteButton onClick={handleGenerateReportClick}>운용 보고서 생성</CompleteButton>
        </Container>
    );
};

export default InformationContainer;
