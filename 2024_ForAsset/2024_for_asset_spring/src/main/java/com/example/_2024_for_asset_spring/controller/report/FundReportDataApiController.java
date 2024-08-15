package com.example._2024_for_asset_spring.controller.report;

import com.example._2024_for_asset_spring.dto.spring.FundReportResponse;
import com.example._2024_for_asset_spring.service.spring.report.FundApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FundReportDataApiController {

    @Autowired
    private FundApiService fundApiService;

    @GetMapping("/api/fund-report")
    public FundReportResponse getFundReportData(
            @RequestParam String fundName,
            @RequestParam String operationPeriod) {

        return fundApiService.getFundReportData(fundName, operationPeriod);
    }
}
