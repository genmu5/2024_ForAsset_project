package com.example._2024_for_asset_spring.repository.spring.report;

import com.example._2024_for_asset_spring.entity.spring.report.OperationPlan;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface OperationPlanRepository extends JpaRepository<OperationPlan, Integer> {
    Optional<OperationPlan> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
