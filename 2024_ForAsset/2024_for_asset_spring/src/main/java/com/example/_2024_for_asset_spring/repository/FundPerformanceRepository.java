package com.example._2024_for_asset_spring.repository;

import com.example._2024_for_asset_spring.entity.FundPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundPerformanceRepository extends JpaRepository<FundPerformance, Long> {
}