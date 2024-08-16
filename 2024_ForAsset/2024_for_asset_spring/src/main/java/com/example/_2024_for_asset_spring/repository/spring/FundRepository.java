package com.example._2024_for_asset_spring.repository.spring;

import com.example._2024_for_asset_spring.entity.spring.report.Fund;
import org.springframework.data.jpa.repository.JpaRepository;

interface FundRepository extends JpaRepository<Fund, Long> {
}
