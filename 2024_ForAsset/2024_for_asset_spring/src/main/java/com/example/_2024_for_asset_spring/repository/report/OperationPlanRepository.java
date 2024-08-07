package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.FundNames;
import com.example._2024_for_asset_spring.entity.report.OperationPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OperationPlanRepository extends JpaRepository<OperationPlan, Integer> {
    Optional<OperationPlan> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
