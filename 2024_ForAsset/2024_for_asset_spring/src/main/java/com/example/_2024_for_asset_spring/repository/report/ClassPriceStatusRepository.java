package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.ClassPriceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassPriceStatusRepository extends JpaRepository<ClassPriceStatus, Integer> {
    List<ClassPriceStatus> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
