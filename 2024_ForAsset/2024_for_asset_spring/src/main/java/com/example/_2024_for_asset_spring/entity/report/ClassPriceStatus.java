package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

import java.math.BigDecimal;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Entity
@Table(name = "class_price_status")
public class ClassPriceStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Fund_ID;

    @Column(name = "Fund_Name")
    private String fundName;

    @Column(name = "Operation_Period")
    private String operationPeriod;

    @Column(name = "Class_Name")
    private String className;

    @Column(name = "Previous_Price")
    private BigDecimal previousPrice;

    @Column(name = "Current_Price")
    private BigDecimal currentPrice;

    @Column(name = "Change_Percentage")
    private BigDecimal changePercentage;


    public Integer getFund_ID() {
        return Fund_ID;
    }

    public void setFund_ID(Integer fund_ID) {
        Fund_ID = fund_ID;
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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
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
