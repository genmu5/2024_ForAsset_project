package com.example._2024_for_asset_spring.repository.spring.report;

import com.example._2024_for_asset_spring.entity.spring.report.AnnualReturns;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface AnnualReturnsRepository extends JpaRepository<AnnualReturns, Integer> {
    Optional<AnnualReturns> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}