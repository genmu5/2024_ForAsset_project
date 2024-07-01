package com.example._2024_for_asset_spring.schedule;

import com.example._2024_for_asset_spring.service.FundPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private FundPerformanceService fundPerformanceService;

    @Scheduled(fixedRateString = "${schedule.fixed-rate}") // 15분 주기 (밀리초 단위)
    public void fetchFundPerformances() {
        System.out.println("Fetching fund performances...");
        fundPerformanceService.fetchAndSaveFundPerformances();
    }
}



