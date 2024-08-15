package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.dto.django.NewsSummary;
import com.example._2024_for_asset_spring.service.django.NewsSummaryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class NewsSummaryController {

    private NewsSummaryService newsSummaryService;

    public NewsSummaryController(NewsSummaryService newsSummaryService) {
        this.newsSummaryService = newsSummaryService;
    }

    @GetMapping("/news-summaries")
    public List<NewsSummary> getNewsSummaries(@RequestParam String keyword,
                                              @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                              @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return newsSummaryService.getNewsSummaries(keyword, startDate, endDate);
    }
}
