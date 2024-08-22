
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: white;
    gap: 10px;
`;

const InfoSection = styled.div`
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 10px;
`;

const InfoTitle = styled.h3`
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
`;

const InfoList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const InfoItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;

    &:last-child {
        border-bottom: none;
    }
`;

const StockName = styled.span`
    flex: 2;
    text-align: left;
`;

const StockPrice = styled.span`
    flex: 1;
    text-align: right;
    color: ${props => (props.isPositive ? 'red' : 'blue')};
`;

const StockChange = styled.span`
    flex: 1;
    text-align: right;
    color: ${props => (props.isPositive ? 'red' : 'blue')};
`;

const StockPercent = styled.span`
    flex: 1;
    text-align: right;
    color: ${props => (props.isPositive ? 'red' : 'blue')};
`;

const InformationContainer = () => {
    const [fundPerformances, setFundPerformances] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/fund-performances')
            .then(response => {
                setFundPerformances(response.data);
            })
            .catch(error => {
                console.error('Error fetching fund performances:', error);
            });
    }, []);

    const filterByType = (type) => {
        const filtered = fundPerformances.filter(item => item.type === type);

        // 중복 제거
        const uniqueFiltered = filtered.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.name === item.name
                ))
        );

        return uniqueFiltered.slice(0, 7);  // 상위 7개 항목만 반환
    };

    const transactionTopPerformers = fundPerformances.slice(0, 7); // 거래 성과 7종
    const upperLimitPerformers = filterByType('상한가'); // 정렬하지 않음
    const lowerLimitPerformers = filterByType('하한가'); // 정렬하지 않음

    const renderStockItem = (stock) => {
        const isPositive = parseFloat(stock.percent) > 0;
        const changeSymbol = isPositive ? '▲' : '▼';
        return (
            <InfoItem key={stock.id}>
                <StockName>{stock.name}</StockName>
                <StockPrice isPositive={isPositive}>{stock.price}</StockPrice>
                <StockChange isPositive={isPositive}>{changeSymbol} {stock.change}</StockChange>
                <StockPercent isPositive={isPositive}>{stock.percent}</StockPercent>
            </InfoItem>
        );
    };

    return (
        <Container>
            <InfoSection>
                <InfoTitle>거래 성과 7종</InfoTitle>
                <InfoList>
                    {transactionTopPerformers.map(renderStockItem)}
                </InfoList>
            </InfoSection>

            <InfoSection>
                <InfoTitle>상한가 상위 7종</InfoTitle>
                <InfoList>
                    {upperLimitPerformers.map(renderStockItem)}
                </InfoList>
            </InfoSection>

            <InfoSection>
                <InfoTitle>하한가 하위 7종</InfoTitle>
                <InfoList>
                    {lowerLimitPerformers.map(renderStockItem)}
                </InfoList>
            </InfoSection>
        </Container>
    );
}

export default InformationContainer;

