package com.example._2024_for_asset_spring.entity.spring.report;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "fund_names")
public class FundNames {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_ID")
    private Integer fundId;

    @Column(name = "fund_name")
    private String fundName;

    @Column(name = "operation_period")
    private String operationPeriod;

    @Column(name = "setting_date")
    private Date settingDate;

    @Column(name = "trust_fee")
    private String trustFee;

    @Column(name = "operation_size")
    private String operationSize;

    @Column(name = "sales_method")
    private String salesMethod;

    @Column(name = "benchmark")
    private String benchmark;

    @Column(name = "investment_objective")
    private String investmentObjective;

    // Getters and Setters
    public Integer getFundId() {
        return fundId;
    }

    public void setFundId(Integer fundId) {
        this.fundId = fundId;
    }

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public String getOperationPeriod() {
        return operationPeriod;
    }

    public void setOperationPeriod(String operationPeriod) {
        this.operationPeriod = operationPeriod;
    }

    public Date getSettingDate() {
        return settingDate;
    }

    public void setSettingDate(Date settingDate) {
        this.settingDate = settingDate;
    }

    public String getTrustFee() {
        return trustFee;
    }

    public void setTrustFee(String trustFee) {
        this.trustFee = trustFee;
    }

    public String getOperationSize() {
        return operationSize;
    }

    public void setOperationSize(String operationSize) {
        this.operationSize = operationSize;
    }

    public String getSalesMethod() {
        return salesMethod;
    }

    public void setSalesMethod(String salesMethod) {
        this.salesMethod = salesMethod;
    }

    public String getBenchmark() {
        return benchmark;
    }

    public void setBenchmark(String benchmark) {
        this.benchmark = benchmark;
    }

    public String getInvestmentObjective() {
        return investmentObjective;
    }

    public void setInvestmentObjective(String investmentObjective) {
        this.investmentObjective = investmentObjective;
    }

}
