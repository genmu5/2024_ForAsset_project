package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cumulative_returns")
public class CumulativeReturns {
    @Id
    private Integer fundId;

    private String fundName;
    private String operationPeriod;
    private BigDecimal cumulativeReturn;

    @ManyToOne
    @JoinColumn(name = "fundId", insertable = false, updatable = false)
    private FundOverview fundOverview;

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

    public BigDecimal getCumulativeReturn() {
        return cumulativeReturn;
    }

    public void setCumulativeReturn(BigDecimal cumulativeReturn) {
        this.cumulativeReturn = cumulativeReturn;
    }

    public FundOverview getFundOverview() {
        return fundOverview;
    }

    public void setFundOverview(FundOverview fundOverview) {
        this.fundOverview = fundOverview;
    }
}
