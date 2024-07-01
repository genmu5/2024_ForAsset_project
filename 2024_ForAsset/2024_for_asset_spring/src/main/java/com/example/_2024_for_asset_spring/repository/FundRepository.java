package com.example._2024_for_asset_spring.repository;

import com.example._2024_for_asset_spring.entity.Fund;
import org.springframework.data.jpa.repository.JpaRepository;

interface FundRepository extends JpaRepository<Fund, Long> {
}
