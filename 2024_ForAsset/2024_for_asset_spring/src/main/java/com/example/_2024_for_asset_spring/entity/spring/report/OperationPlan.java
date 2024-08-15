package com.example._2024_for_asset_spring.entity.spring.report;

import jakarta.persistence.*;

@Entity
@Table(name = "operation_plan")
public class OperationPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_ID")
    private Integer fundId;

    @Column(name = "Fund_Name")
    private String fundName;

    @Column(name = "Operation_Period")
    private String operationPeriod;

    @Column(name = "Plan_Details")
    private String planDetails;



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

    public Integer getFundId() {
        return fundId;
    }

    public void setFundId(Integer fundId) {
        this.fundId = fundId;
    }
}
