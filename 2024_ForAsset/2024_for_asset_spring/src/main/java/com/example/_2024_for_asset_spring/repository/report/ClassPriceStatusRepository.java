package com.example._2024_for_asset_spring.repository.report;

import com.example._2024_for_asset_spring.entity.report.ClassPriceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassPriceStatusRepository extends JpaRepository<ClassPriceStatus, Integer> {
    @Query("SELECT c FROM ClassPriceStatus c WHERE c.fundName = :fundName AND c.operationPeriod = :operationPeriod")
    List<ClassPriceStatus> findClassPriceStatus(@Param("fundName") String fundName, @Param("operationPeriod") String operationPeriod);
}
