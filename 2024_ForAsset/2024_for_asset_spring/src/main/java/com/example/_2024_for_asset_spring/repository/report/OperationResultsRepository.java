package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.OperationResults;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OperationResultsRepository extends JpaRepository<OperationResults, Integer> {
    Optional<OperationResults> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
