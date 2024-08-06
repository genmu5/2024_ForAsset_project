package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.FundResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FundResultRepository extends JpaRepository<FundResult, Long> {
    Optional<FundResult> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}