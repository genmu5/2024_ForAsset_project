package com.example._2024_for_asset_spring.entity.report;

import java.io.Serializable;
import java.util.Objects;

public class ClassPriceStatusId implements Serializable {
    private Integer fundID;
    private String fundName;
    private String operationPeriod;
    private String className;

    // 기본 생성자
    public ClassPriceStatusId() {}

    // 모든 필드를 포함하는 생성자
    public ClassPriceStatusId(Integer fundID, String fundName, String operationPeriod, String className) {
        this.fundID = fundID;
        this.fundName = fundName;
        this.operationPeriod = operationPeriod;
        this.className = className;
    }

    // getter와 setter
    public Integer getFundID() {
        return fundID;
    }

    public void setFundID(Integer fundID) {
        this.fundID = fundID;
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

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    // equals와 hashCode 메소드
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassPriceStatusId that = (ClassPriceStatusId) o;
        return Objects.equals(fundID, that.fundID) && Objects.equals(fundName, that.fundName) &&
                Objects.equals(operationPeriod, that.operationPeriod) && Objects.equals(className, that.className);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fundID, fundName, operationPeriod, className);
    }
}
