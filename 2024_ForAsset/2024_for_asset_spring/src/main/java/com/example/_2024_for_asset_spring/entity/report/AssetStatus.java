package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "asset_status")
public class AssetStatus {
    @Id
    private Integer fundId;

    private String fundName;
    private String operationPeriod;
    private BigDecimal totalAssets;
    private BigDecimal liabilities;
    private BigDecimal netAssets;
    private BigDecimal previousNetAssets;
    private BigDecimal changePercentage;

    @ManyToOne
    @JoinColumn(name = "fundId", insertable = false, updatable = false)
    private FundOverview fundOverview;

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

    public BigDecimal getTotalAssets() {
        return totalAssets;
    }

    public void setTotalAssets(BigDecimal totalAssets) {
        this.totalAssets = totalAssets;
    }

    public BigDecimal getLiabilities() {
        return liabilities;
    }

    public void setLiabilities(BigDecimal liabilities) {
        this.liabilities = liabilities;
    }

    public BigDecimal getNetAssets() {
        return netAssets;
    }

    public void setNetAssets(BigDecimal netAssets) {
        this.netAssets = netAssets;
    }

    public BigDecimal getPreviousNetAssets() {
        return previousNetAssets;
    }

    public void setPreviousNetAssets(BigDecimal previousNetAssets) {
        this.previousNetAssets = previousNetAssets;
    }

    public BigDecimal getChangePercentage() {
        return changePercentage;
    }

    public void setChangePercentage(BigDecimal changePercentage) {
        this.changePercentage = changePercentage;
    }

    public FundOverview getFundOverview() {
        return fundOverview;
    }

    public void setFundOverview(FundOverview fundOverview) {
        this.fundOverview = fundOverview;
    }
}
