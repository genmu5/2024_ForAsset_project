package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.CumulativeReturns;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CumulativeReturnsRepository extends JpaRepository<CumulativeReturns, Integer> {
    Optional<CumulativeReturns> findByFundId(Integer fundId);
}
