package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.AnnualReturns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AnnualReturnsRepository extends JpaRepository<AnnualReturns, Integer> {
    Optional<AnnualReturns> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}