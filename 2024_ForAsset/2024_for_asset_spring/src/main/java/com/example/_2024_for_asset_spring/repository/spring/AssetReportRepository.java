package com.example._2024_for_asset_spring.repository.spring;

import com.example._2024_for_asset_spring.entity.spring.report.AssetReport;
import org.springframework.data.jpa.repository.JpaRepository;

interface AssetReportRepository extends JpaRepository<AssetReport, Long> {
}
