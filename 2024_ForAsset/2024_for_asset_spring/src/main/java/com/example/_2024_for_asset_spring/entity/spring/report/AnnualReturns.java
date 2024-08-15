package com.example._2024_for_asset_spring.entity.spring.report;

import jakarta.persistence.*;

@Entity
@Table(name = "annual_returns")
public class AnnualReturns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Fund_ID")
    private Integer Fund_ID;

    @Column(name = "fund_name", nullable = false)
    private String fundName;

    @Column(name = "operation_period", nullable = false)
    private String operationPeriod;

    @Column(name = "Return_2021")
    private Double return2021;

    @Column(name = "Return_2022")
    private Double return2022;

    @Column(name = "Return_2023")
    private Double return2023;

    @Column(name = "Return_2024")
    private Double return2024;


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

    public Double getReturn2021() {
        return return2021;
    }

    public void setReturn2021(Double return2021) {
        this.return2021 = return2021;
    }

    public Double getReturn2022() {
        return return2022;
    }

    public void setReturn2022(Double return2022) {
        this.return2022 = return2022;
    }

    public Double getReturn2023() {
        return return2023;
    }

    public void setReturn2023(Double return2023) {
        this.return2023 = return2023;
    }

    public Double getReturn2024() {
        return return2024;
    }

    public void setReturn2024(Double return2024) {
        this.return2024 = return2024;
    }
}
