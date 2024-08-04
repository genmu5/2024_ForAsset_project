package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.FundNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundNamesRepository extends JpaRepository<FundNames, Integer> {
}
