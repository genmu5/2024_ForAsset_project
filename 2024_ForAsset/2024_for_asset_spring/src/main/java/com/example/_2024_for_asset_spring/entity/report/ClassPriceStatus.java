package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "class_price_status")
@IdClass(ClassPriceStatusId.class)
public class ClassPriceStatus {

    @Id
    @Column(name = "Fund_ID")
    private Integer fundID;

    @Id
    @Column(name = "Fund_Name")
    private String fundName;

    @Id
    @Column(name = "Operation_Period")
    private String operationPeriod;

    @Id
    @Column(name = "Class_Name")
    private String className;

    @Column(name = "Previous_Price")
    private BigDecimal previousPrice;

    @Column(name = "Current_Price")
    private BigDecimal currentPrice;

    @Column(name = "Change_Percentage")
    private BigDecimal changePercentage;

    // Getters and setters

    public Integer getFundID() {
        return fundID;
    }

    public void setFundID(Integer fundID) {
        this.fundID = fundID;
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

    @Override
    public String toString() {
        return "ClassPriceStatus{" +
                "fundID=" + fundID +
                ", fundName='" + fundName + '\'' +
                ", operationPeriod='" + operationPeriod + '\'' +
                ", className='" + className + '\'' +
                ", previousPrice=" + previousPrice +
                ", currentPrice=" + currentPrice +
                ", changePercentage=" + changePercentage +
                '}';
    }
}
