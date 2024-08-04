package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Fund_Overview")
public class FundOverview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_ID")
    private Integer fundId;

    @Column(name = "Operation_Period")
    private String operationPeriod;

    @Column(name = "Fund_Type")
    private String fundType;

    @Column(name = "Initial_Setting_Date")
    private Date initialSettingDate;

    @Column(name = "Duration")
    private String duration;

    @Column(name = "Operation_Size")
    private Double operationSize;

    @Column(name = "Setting_Date")
    private Date settingDate;

    @Column(name = "Risk_Level")
    private String riskLevel;

    // Getters and setters
    public Integer getFundId() {
        return fundId;
    }

    public void setFundId(Integer fundId) {
        this.fundId = fundId;
    }

    public String getOperationPeriod() {
        return operationPeriod;
    }

    public void setOperationPeriod(String operationPeriod) {
        this.operationPeriod = operationPeriod;
    }

    public String getFundType() {
        return fundType;
    }

    public void setFundType(String fundType) {
        this.fundType = fundType;
    }

    public Date getInitialSettingDate() {
        return initialSettingDate;
    }

    public void setInitialSettingDate(Date initialSettingDate) {
        this.initialSettingDate = initialSettingDate;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Double getOperationSize() {
        return operationSize;
    }

    public void setOperationSize(Double operationSize) {
        this.operationSize = operationSize;
    }

    public Date getSettingDate() {
        return settingDate;
    }

    public void setSettingDate(Date settingDate) {
        this.settingDate = settingDate;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}
