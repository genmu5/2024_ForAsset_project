package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AssetStatusRepository extends JpaRepository<AssetStatus, Integer> {
    Optional<AssetStatus> findByFundId(Integer fundId);

}
