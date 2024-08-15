package com.example._2024_for_asset_spring.repository.primary.report;


import com.example._2024_for_asset_spring.entity.spring.report.ClassPriceStatus;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Primary
public interface ClassPriceStatusRepository extends JpaRepository<ClassPriceStatus, Integer> {
    @Query("SELECT c FROM ClassPriceStatus c WHERE c.fundName = :fundName AND c.operationPeriod = :operationPeriod")
    List<ClassPriceStatus> findClassPriceStatus(@Param("fundName") String fundName, @Param("operationPeriod") String operationPeriod);
    List<ClassPriceStatus> findByFundNameAndOperationPeriod(String fundName, String operationPeriod);
}
