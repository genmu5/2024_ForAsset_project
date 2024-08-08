package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

@Entity
@Table(name = "operation_plan")
public class OperationPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Fund_ID;

    @Column(name = "Fund_Name")
    private String fundName;

    @Column(name = "Operation_Period")
    private String operationPeriod;

    private String planDetails;

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


    public String getPlanDetails() {
        return planDetails;
    }

    public void setPlanDetails(String planDetails) {
        this.planDetails = planDetails;
    }
}
