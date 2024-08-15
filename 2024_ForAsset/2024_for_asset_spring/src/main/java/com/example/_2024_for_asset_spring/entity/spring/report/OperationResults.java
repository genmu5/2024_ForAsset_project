package com.example._2024_for_asset_spring.entity.spring.report;

import jakarta.persistence.*;

@Entity
@Table(name = "operation_results")
public class OperationResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_ID")
    private Integer fundId;

    @Column(name = "Fund_Name")
    private String fundName;

    @Column(name = "Operation_Period")
    private String operationPeriod;

    @Column(name = "Commentary")
    private String commentary;

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

    public String getCommentary() {
        return commentary;
    }

    public void setCommentary(String commentary) {
        this.commentary = commentary;
    }
}
