package com.example._2024_for_asset_spring.dto.spring;

import com.example._2024_for_asset_spring.entity.spring.report.ClassPriceStatus;
import com.example._2024_for_asset_spring.entity.spring.report.MarketStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FundReportResponse {
    private String fundName;
    private String operationPeriod;
    private String settingDate;
    private String trustFee;
    private String operationSize;
    private String salesMethod;
    private String benchmark;
    private String investmentObjective;
    private Double period3M;
    private Double period6M;
    private Double period1Y;
    private Double period3Y;
    private Double period5Y;
    private Double bmPeriod3M;
    private Double bmPeriod6M;
    private Double bmPeriod1Y;
    private Double bmPeriod3Y;
    private Double bmPeriod5Y;
    private Double return2021;
    private Double return2022;
    private Double return2023;
    private Double return2024;
    private List<ClassPriceStatus> classPriceStatusList;
    private List<MarketStatus> marketStatusList;
    private String planDetails;
    private String commentary;
}
