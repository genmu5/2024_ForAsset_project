package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "market_status")
public class MarketStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fundId;

    @Column(name = "Fund_Name")
    private String fundName;

    @Column(name = "Operation_Period")
    private String operationPeriod;
    private Long assetTotal;
    private Long assetPrevious;
    private Long debtTotal;
    private Long debtPrevious;
    private Long netAssetTotal;
    private Long netAssetPrevious;
    private BigDecimal standardPriceCurrent;
    private BigDecimal standardPricePrevious;
    private String growthRateAsset;
    private String growthRateDebt;
    private String growthRateNetAsset;
    private String growthRateStandardPrice;

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
