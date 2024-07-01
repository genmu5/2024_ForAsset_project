package com.example._2024_for_asset_spring.service;

import com.example._2024_for_asset_spring.entity.FundPerformance;
import com.example._2024_for_asset_spring.repository.FundPerformanceRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FundPerformanceService {

    @Autowired
    private FundPerformanceRepository fundPerformanceRepository;

    @Transactional
    public void fetchAndSaveFundPerformances() {
        List<FundPerformance> fundPerformances = new ArrayList<>();

        try {
            Document doc = Jsoup.connect("https://finance.naver.com/").get();

            // 거래 상위 종목 크롤링
            Elements topTrades = doc.select("#_topItems1 > tr");
            extractFundPerformances(fundPerformances, topTrades, "상위");

            // 상한가 종목 크롤링
            Elements topUps = doc.select("#_topItems2 > tr");
            extractFundPerformances(fundPerformances, topUps, "상한가");

            // 하한가 종목 크롤링
            Elements topDowns = doc.select("#_topItems3 > tr");
            extractFundPerformances(fundPerformances, topDowns, "하한가");

            fundPerformanceRepository.saveAll(fundPerformances);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Failed to fetch data");
        }

        System.out.println("Successfully fetched and saved data");
    }
    public List<FundPerformance> getAllFundPerformances() {
        return fundPerformanceRepository.findAll();
    }

    private void extractFundPerformances(List<FundPerformance> fundPerformances, Elements rows, String type) {
        for (var row : rows) {
            String name = row.select("th > a").text();
            String price = row.select("td:nth-child(2)").text();
            String change = row.select("td:nth-child(3)").text();
            String percent = row.select("td:nth-child(4)").text();

            FundPerformance fundPerformance = new FundPerformance();
            fundPerformance.setName(name);
            fundPerformance.setPrice(price + "원");
            fundPerformance.setChange(change.replace(type, type.equals("상한가") ? "↑" : "↓"));
            fundPerformance.setPercent(percent);
            fundPerformance.setType(type);
            fundPerformance.setCreatedAt(LocalDateTime.now());

            fundPerformances.add(fundPerformance);
        }
    }
}

