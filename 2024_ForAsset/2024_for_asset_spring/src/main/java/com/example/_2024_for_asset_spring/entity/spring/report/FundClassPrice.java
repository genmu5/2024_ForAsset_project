package com.example._2024_for_asset_spring.entity.spring.report;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "fund_class_price")
public class FundClassPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fundId;

    @Column(name = "fund_name")
    private String fundName;

    @Column(name = "operation_period")
    private String operationPeriod;

    @Column(name = "class_name")
    private String classname;

    @Column(name = "fund_code")
    private String fundcode;

    @Column(name = "Previous_Price")
    private BigDecimal previousPrice;

    @Column(name = "Current_Price")
    private BigDecimal currentPrice;

    @Column(name = "Change_Percentage")
    private BigDecimal changePercentage;

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

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }

    public String getFundcode() {
        return fundcode;
    }

    public void setFundcode(String fundcode) {
        this.fundcode = fundcode;
    }

    public BigDecimal getPreviousPrice() {
        return previousPrice;
    }

    public void setPreviousPrice(BigDecimal previousPrice) {
        this.previousPrice = previousPrice;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public BigDecimal getChangePercentage() {
        return changePercentage;
    }

    public void setChangePercentage(BigDecimal changePercentage) {
        this.changePercentage = changePercentage;
    }
}
