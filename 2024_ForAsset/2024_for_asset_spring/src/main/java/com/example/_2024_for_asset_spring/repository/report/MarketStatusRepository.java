package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.MarketStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarketStatusRepository extends JpaRepository<MarketStatus, Integer> {
    List<MarketStatus> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
