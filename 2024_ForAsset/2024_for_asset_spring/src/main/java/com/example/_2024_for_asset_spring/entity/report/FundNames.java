package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

@Entity
@Table(name = "Fund_Names")
public class FundNames {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_Name_ID")
    private Integer fundNameId;

    @Column(name = "Fund_Name")
    private String fundName;

    @Column(name = "Operation_Period")
    private String operationPeriod;

    @Column(name = "Fund_Code")
    private String fundCode;

    // Getters and setters
    public Integer getFundNameId() {
        return fundNameId;
    }

    public void setFundNameId(Integer fundNameId) {
        this.fundNameId = fundNameId;
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

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }
}
