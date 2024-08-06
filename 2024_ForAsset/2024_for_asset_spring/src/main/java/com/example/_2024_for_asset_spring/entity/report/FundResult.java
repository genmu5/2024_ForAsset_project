package com.example._2024_for_asset_spring.entity.report;

import jakarta.persistence.*;

@Entity
@Table(name = "fund_result")
public class FundResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fundId;

    @Column(nullable = false)
    private String fundName;

    @Column(nullable = false)
    private String operationPeriod;

    private Double Period_3M;
    private Double Period_6M;
    private Double Period_1Y;
    private Double Period_3Y;
    private Double Period_5Y;
    private Double Bm_Period_3M;
    private Double Bm_Period_6M;
    private Double Bm_Period_1Y;
    private Double Bm_Period_3Y;
    private Double Bm_Period_5Y;


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

    public Double getPeriod_3M() {
        return Period_3M;
    }

    public void setPeriod_3M(Double period_3M) {
        Period_3M = period_3M;
    }

    public Double getPeriod_6M() {
        return Period_6M;
    }

    public void setPeriod_6M(Double period_6M) {
        Period_6M = period_6M;
    }

    public Double getPeriod_1Y() {
        return Period_1Y;
    }

    public void setPeriod_1Y(Double period_1Y) {
        Period_1Y = period_1Y;
    }

    public Double getPeriod_3Y() {
        return Period_3Y;
    }

    public void setPeriod_3Y(Double period_3Y) {
        Period_3Y = period_3Y;
    }

    public Double getPeriod_5Y() {
        return Period_5Y;
    }

    public void setPeriod_5Y(Double period_5Y) {
        Period_5Y = period_5Y;
    }


    public Double getBm_Period_3M() {
        return Bm_Period_3M;
    }

    public void setBm_Period_3M(Double bm_Period_3M) {
        Bm_Period_3M = bm_Period_3M;
    }

    public Double getBm_Period_6M() {
        return Bm_Period_6M;
    }

    public void setBm_Period_6M(Double bm_Period_6M) {
        Bm_Period_6M = bm_Period_6M;
    }

    public Double getBm_Period_1Y() {
        return Bm_Period_1Y;
    }

    public void setBm_Period_1Y(Double bm_Period_1Y) {
        Bm_Period_1Y = bm_Period_1Y;
    }

    public Double getBm_Period_3Y() {
        return Bm_Period_3Y;
    }

    public void setBm_Period_3Y(Double bm_Period_3Y) {
        Bm_Period_3Y = bm_Period_3Y;
    }

    public Double getBm_Period_5Y() {
        return Bm_Period_5Y;
    }

    public void setBm_Period_5Y(Double bm_Period_5Y) {
        Bm_Period_5Y = bm_Period_5Y;
    }
}
