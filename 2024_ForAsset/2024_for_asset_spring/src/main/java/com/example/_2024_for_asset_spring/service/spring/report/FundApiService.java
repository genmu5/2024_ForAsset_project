package com.example._2024_for_asset_spring.service.spring.report;

import com.example._2024_for_asset_spring.dto.spring.FundReportResponse;
import com.example._2024_for_asset_spring.entity.spring.report.*;
import com.example._2024_for_asset_spring.repository.spring.*;
import com.example._2024_for_asset_spring.repository.spring.report.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class FundApiService {

    @Autowired
    private FundNamesRepository fundNamesRepository;
    @Autowired
    private FundResultRepository fundResultRepository;
    @Autowired
    private AnnualReturnsRepository annualReturnsRepository;
    @Autowired
    private ClassPriceStatusRepository classPriceStatusRepository;
    @Autowired
    private MarketStatusRepository marketStatusRepository;
    @Autowired
    private OperationPlanRepository operationPlanRepository;
    @Autowired
    private OperationResultsRepository operationResultsRepository;

    public FundReportResponse getFundReportData(String fundName, String operationPeriod) {
        Optional<FundNames> fundNamesOptional = fundNamesRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
        if (fundNamesOptional.isEmpty()) {
            throw new RuntimeException("Fund not found");
        }

        FundNames fundNames = fundNamesOptional.get();

        Optional<FundResult> fundResultOptional = fundResultRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
        FundResult fundResult = fundResultOptional.orElse(null);

        Optional<AnnualReturns> annualReturnsOptional = annualReturnsRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
        AnnualReturns annualReturns = annualReturnsOptional.orElse(null);

        List<ClassPriceStatus> classPriceStatusList = classPriceStatusRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
        List<MarketStatus> marketStatusList = marketStatusRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);

        Optional<OperationPlan> operationPlanOptional = operationPlanRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
        OperationPlan operationPlan = operationPlanOptional.orElse(null);

        Optional<OperationResults> operationResultsOptional = operationResultsRepository.findByFundNameAndOperationPeriod(fundName, operationPeriod);
        OperationResults operationResults = operationResultsOptional.orElse(null);

        FundReportResponse response = new FundReportResponse();
        response.setFundName(fundNames.getFundName());
        response.setOperationPeriod(fundNames.getOperationPeriod());
        response.setSettingDate(new SimpleDateFormat("yyyy-MM-dd").format(fundNames.getSettingDate()));
        response.setTrustFee(fundNames.getTrustFee());
        response.setOperationSize(fundNames.getOperationSize());
        response.setSalesMethod(fundNames.getSalesMethod());
        response.setBenchmark(fundNames.getBenchmark());
        response.setInvestmentObjective(fundNames.getInvestmentObjective());

        if (fundResult != null) {
            response.setPeriod3M(fundResult.getPeriod_3M());
            response.setPeriod6M(fundResult.getPeriod_6M());
            response.setPeriod1Y(fundResult.getPeriod_1Y());
            response.setPeriod3Y(fundResult.getPeriod_3Y());
            response.setPeriod5Y(fundResult.getPeriod_5Y());
            response.setBmPeriod3M(fundResult.getBm_Period_3M());
            response.setBmPeriod6M(fundResult.getBm_Period_6M());
            response.setBmPeriod1Y(fundResult.getBm_Period_1Y());
            response.setBmPeriod3Y(fundResult.getBm_Period_3Y());
            response.setBmPeriod5Y(fundResult.getBm_Period_5Y());
        }

        if (annualReturns != null) {
            response.setReturn2021(annualReturns.getReturn2021());
            response.setReturn2022(annualReturns.getReturn2022());
            response.setReturn2023(annualReturns.getReturn2023());
            response.setReturn2024(annualReturns.getReturn2024());
        }

        response.setClassPriceStatusList(classPriceStatusList);
        response.setMarketStatusList(marketStatusList);

        if (operationPlan != null) {
            response.setPlanDetails(operationPlan.getPlanDetails());
        }

        if (operationResults != null) {
            response.setCommentary(operationResults.getCommentary());
        }

        return response;
    }
}
