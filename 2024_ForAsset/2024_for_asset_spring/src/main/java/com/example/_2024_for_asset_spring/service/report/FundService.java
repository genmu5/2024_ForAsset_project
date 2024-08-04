package com.example._2024_for_asset_spring.service.report;

import com.example._2024_for_asset_spring.entity.report.FundNames;
import com.example._2024_for_asset_spring.entity.report.FundOverview;
import com.example._2024_for_asset_spring.repository.report.FundNamesRepository;
import com.example._2024_for_asset_spring.repository.report.FundOverviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundService {

    @Autowired
    private FundOverviewRepository fundOverviewRepository;

    @Autowired
    private FundNamesRepository fundNamesRepository;

    public List<FundOverview> getAllFundOverviews() {
        return fundOverviewRepository.findAll();
    }

    public List<FundNames> getAllFundNames() {
        return fundNamesRepository.findAll();
    }

    public FundOverview getFundOverviewById(Integer id) {
        return fundOverviewRepository.findById(id).orElse(null);
    }

    public FundNames getFundNamesById(Integer id) {
        return fundNamesRepository.findById(id).orElse(null);
    }
}
