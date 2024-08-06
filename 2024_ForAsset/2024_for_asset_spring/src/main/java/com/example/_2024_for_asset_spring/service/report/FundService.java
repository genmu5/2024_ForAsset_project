package com.example._2024_for_asset_spring.service.report;

import com.example._2024_for_asset_spring.entity.report.*;
import com.example._2024_for_asset_spring.repository.report.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundService {
    @Autowired
    private FundOverviewRepository fundOverviewRepository;

    @Autowired
    private FundNamesRepository fundNamesRepository;

    @Autowired
    private FundResultRepository fundResultRepository;

    @Autowired
    private AnnualReturnsRepository annualReturnsRepository;

    public FundOverview getFundOverview(String fundName, String operationPeriod) {
        return fundOverviewRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod)
                .orElse(null);
    }

    public FundNames getFundNames(String fundName, String operationPeriod) {
        return fundNamesRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod)
                .orElse(null);
    }

    public FundResult getFundResult(String fundName, String operationPeriod) {
        return fundResultRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod)
                .orElse(null);
    }

    public AnnualReturns getAnnualReturns(String fundName, String operationPeriod) {
        return annualReturnsRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod)
                .orElse(null);
    }

}
