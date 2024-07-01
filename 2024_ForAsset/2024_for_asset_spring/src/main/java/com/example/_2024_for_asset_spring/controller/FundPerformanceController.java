package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.entity.FundPerformance;
import com.example._2024_for_asset_spring.service.FundPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FundPerformanceController {

    @Autowired
    private FundPerformanceService fundPerformanceService;

    @GetMapping("/fetch-fund-performances")
    public String fetchFundPerformances() {
        fundPerformanceService.fetchAndSaveFundPerformances();
        return "Successfully fetched and saved fund performances";
    }

    @GetMapping("/fund-performances")
    public List<FundPerformance> getAllFundPerformances() {
        return fundPerformanceService.getAllFundPerformances();
    }
}

