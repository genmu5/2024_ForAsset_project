package com.example._2024_for_asset_spring.repository.primary.report;


import com.example._2024_for_asset_spring.entity.spring.report.FundClassPrice;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Primary
public interface FundClassPriceRepository extends JpaRepository<FundClassPrice, Integer> {
}