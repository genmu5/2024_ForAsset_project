package com.example._2024_for_asset_spring.repository.spring.report;

import com.example._2024_for_asset_spring.entity.spring.report.MarketStatus;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Primary
public interface MarketStatusRepository extends JpaRepository<MarketStatus, Integer> {
    List<MarketStatus> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
