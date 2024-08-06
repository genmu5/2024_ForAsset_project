package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.FundNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FundNamesRepository extends JpaRepository<FundNames, Long> {
    Optional<FundNames> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}