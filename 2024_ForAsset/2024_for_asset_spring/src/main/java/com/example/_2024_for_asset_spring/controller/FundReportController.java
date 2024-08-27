package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.dto.django.FundReportRequest;
import com.example._2024_for_asset_spring.entity.spring.report.FundNames;
import com.example._2024_for_asset_spring.repository.spring.report.FundNamesRepository;
import com.example._2024_for_asset_spring.service.spring.report.OperationPlanService;
import com.example._2024_for_asset_spring.service.spring.report.OperationResultsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/funds")
public class FundReportController {

    private final OperationPlanService operationPlanService;
    private final OperationResultsService operationResultsService;
    private final FundNamesRepository fundNamesRepository;

    @Autowired
    public FundReportController(OperationPlanService operationPlanService, OperationResultsService operationResultsService, FundNamesRepository fundNamesRepository) {
        this.operationPlanService = operationPlanService;
        this.operationResultsService = operationResultsService;
        this.fundNamesRepository = fundNamesRepository;
    }

    @PostMapping("/generate-plan")
    public ResponseEntity<String> generateOperationPlan(@RequestBody FundReportRequest request) {
        try {
            String planDetails = operationPlanService.generateAndSaveOperationPlan(
                    request.getFundName(),
                    request.getOperationPeriod(),
                    request.getNewsSummaries()
            );
            return ResponseEntity.ok(planDetails);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error generating operation plan: " + e.getMessage());
        }
    }

    @PostMapping("/generate-results")
    public ResponseEntity<String> generateOperationResults(@RequestBody FundReportRequest request) {
        try {
            String commentary = operationResultsService.generateAndSaveOperationResults(
                    request.getFundName(),
                    request.getOperationPeriod(),
                    request.getNewsSummaries()
            );
            return ResponseEntity.ok(commentary);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error generating operation results: " + e.getMessage());
        }
    }

    @GetMapping("/names")
    public ResponseEntity<List<String>> getFundNames() {
        List<String> fundNames = fundNamesRepository.findAll().stream()
                .map(FundNames::getFundName)
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(fundNames);
    }

    // 특정 펀드 이름에 맞는 운용 기간 목록을 반환하는 엔드포인트
    @GetMapping("/periods")
    public ResponseEntity<List<String>> getOperationPeriodsByFundName(@RequestParam String fundName) {
        List<String> operationPeriods = fundNamesRepository.findByFundName(fundName).stream()
                .map(FundNames::getOperationPeriod)
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(operationPeriods);
    }
}
