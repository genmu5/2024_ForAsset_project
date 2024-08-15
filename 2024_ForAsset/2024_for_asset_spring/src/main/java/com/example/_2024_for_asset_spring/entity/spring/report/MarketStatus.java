package com.example._2024_for_asset_spring.entity.spring.report;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "market_status")
public class MarketStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_ID")
    private Integer fundId;

    @Column(name = "fund_name")
    private String fundName;

    @Column(name = "operation_period")
    private String operationPeriod;

    @Column(name = "Asset_Total")
    private Long assetTotal;

    @Column(name = "Asset_Previous")
    private Long assetPrevious;

    @Column(name = "Debt_Total")
    private Long debtTotal;

    @Column(name = "Debt_Previous")
    private Long debtPrevious;

    @Column(name = "Net_Asset_Total")
    private Long netAssetTotal;

    @Column(name = "Net_Asset_Previous")
    private Long netAssetPrevious;

    @Column(name = "standard_price_current")
    private BigDecimal standardPriceCurrent;

    @Column(name = "standard_price_previous")
    private BigDecimal standardPricePrevious;

    @Column(name = "growth_rate_asset")
    private String growthRateAsset;

    @Column(name = "growth_rate_debt")
    private String growthRateDebt;

    @Column(name = "growth_rate_net_asset")
    private String growthRateNetAsset;

    @Column(name = "growth_rate_standard_price")
    private String growthRateStandardPrice;

    // Getters and setters
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

    public Long getAssetTotal() {
        return assetTotal;
    }

    public void setAssetTotal(Long assetTotal) {
        this.assetTotal = assetTotal;
    }

    public Long getAssetPrevious() {
        return assetPrevious;
    }

    public void setAssetPrevious(Long assetPrevious) {
        this.assetPrevious = assetPrevious;
    }

    public Long getDebtTotal() {
        return debtTotal;
    }

    public void setDebtTotal(Long debtTotal) {
        this.debtTotal = debtTotal;
    }

    public Long getDebtPrevious() {
        return debtPrevious;
    }

    public void setDebtPrevious(Long debtPrevious) {
        this.debtPrevious = debtPrevious;
    }

    public Long getNetAssetTotal() {
        return netAssetTotal;
    }

    public void setNetAssetTotal(Long netAssetTotal) {
        this.netAssetTotal = netAssetTotal;
    }

    public Long getNetAssetPrevious() {
        return netAssetPrevious;
    }

    public void setNetAssetPrevious(Long netAssetPrevious) {
        this.netAssetPrevious = netAssetPrevious;
    }

    public BigDecimal getStandardPriceCurrent() {
        return standardPriceCurrent;
    }

    public void setStandardPriceCurrent(BigDecimal standardPriceCurrent) {
        this.standardPriceCurrent = standardPriceCurrent;
    }

    public BigDecimal getStandardPricePrevious() {
        return standardPricePrevious;
    }

    public void setStandardPricePrevious(BigDecimal standardPricePrevious) {
        this.standardPricePrevious = standardPricePrevious;
    }

    public String getGrowthRateAsset() {
        return growthRateAsset;
    }

    public void setGrowthRateAsset(String growthRateAsset) {
        this.growthRateAsset = growthRateAsset;
    }

    public String getGrowthRateDebt() {
        return growthRateDebt;
    }

    public void setGrowthRateDebt(String growthRateDebt) {
        this.growthRateDebt = growthRateDebt;
    }

    public String getGrowthRateNetAsset() {
        return growthRateNetAsset;
    }

    public void setGrowthRateNetAsset(String growthRateNetAsset) {
        this.growthRateNetAsset = growthRateNetAsset;
    }

    public String getGrowthRateStandardPrice() {
        return growthRateStandardPrice;
    }

    public void setGrowthRateStandardPrice(String growthRateStandardPrice) {
        this.growthRateStandardPrice = growthRateStandardPrice;
    }
}
