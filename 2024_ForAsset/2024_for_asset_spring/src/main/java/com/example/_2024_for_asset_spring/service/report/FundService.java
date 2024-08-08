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

    @Autowired
    private ClassPriceStatusRepository classPriceStatusRepository;

    @Autowired
    private MarketStatusRepository marketRepository;

    @Autowired
    private OperationPlanRepository operationPlanRepository;

    @Autowired
    private OperationResultsRepository operationResultsRepository;

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

    public List<ClassPriceStatus> getClassPriceStatusByFundNameAndOperationPeriod(String fundName, String operationPeriod) {
        return classPriceStatusRepository.findClassPriceStatus(fundName, operationPeriod);
    }

    public List<MarketStatus> getMarketStatusByFundNameAndOperationPeriod(String fundName, String operationPeriod) {
        return marketRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
    }

    public OperationPlan getOperationPlan(String fundName, String operationPeriod) {
        return operationPlanRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod)
                .orElse(null);
    }

    public OperationResults getOperationResults(String fundName, String operationPeriod) {
        return operationResultsRepository.findByFundNameAndOperationPeriod(fundName,operationPeriod)
                .orElse(null);
    }

}
