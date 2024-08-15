package com.example._2024_for_asset_spring.controller.report;//package com.example.kb.controller.django.report;
//
//import com.example.kb.dto.spring.FundReportResponse;
//import com.example.kb.entity.spring.report.*;
//import com.example.kb.service.spring.report.FundService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.text.SimpleDateFormat;
//import java.util.List;
//
//@RestController
//public class FundReportApiController {
//
//    @Autowired
//    private FundService fundService;
//
//    @GetMapping("/api/fund-report")
//    public FundReportResponse getFundReportData(
//            @RequestParam String fundName,
//            @RequestParam String operationPeriod) {
//
//        String decodedFundName = java.net.URLDecoder.decode(fundName, java.nio.charset.StandardCharsets.UTF_8);
//        String decodedOperationPeriod = java.net.URLDecoder.decode(operationPeriod, java.nio.charset.StandardCharsets.UTF_8);
//
//        FundOverview fundOverview = fundService.getFundOverview(decodedFundName, decodedOperationPeriod);
//        FundNames fundNames = fundService.getFundNames(decodedFundName, decodedOperationPeriod);
//        FundResult fundResult = fundService.getFundResult(decodedFundName, decodedOperationPeriod);
//        AnnualReturns annualReturns = fundService.getAnnualReturns(decodedFundName, decodedOperationPeriod);
//        List<ClassPriceStatus> classPriceStatusList = fundService.getClassPriceStatusByFundNameAndOperationPeriod(decodedFundName, decodedOperationPeriod);
//        List<MarketStatus> marketStatusList = fundService.getMarketStatusByFundNameAndOperationPeriod(decodedFundName, decodedOperationPeriod);
//        OperationPlan operationPlan = fundService.getOperationPlan(decodedFundName, decodedOperationPeriod);
//        OperationResults operationResults = fundService.getOperationResults(decodedFundName, decodedOperationPeriod);
//
//        FundReportResponse response = new FundReportResponse();
//        response.setFundName(fundNames.getFundName());
//        response.setOperationPeriod(fundNames.getOperationPeriod());
//        response.setSettingDate(new SimpleDateFormat("yyyy-MM-dd").format(fundNames.getSettingDate()));
//        response.setTrustFee(fundNames.getTrustFee());
//        response.setOperationSize(fundNames.getOperationSize());
//        response.setSalesMethod(fundNames.getSalesMethod());
//        response.setBenchmark(fundNames.getBenchmark());
//        response.setInvestmentObjective(fundNames.getInvestmentObjective());
//        response.setPeriod3M(String.valueOf(fundResult.getPeriod_3M()));
//        response.setPeriod6M(String.valueOf(fundResult.getPeriod_6M()));
//        response.setPeriod1Y(String.valueOf(fundResult.getPeriod_1Y()));
//        response.setPeriod3Y(String.valueOf(fundResult.getPeriod_3Y()));
//        response.setPeriod5Y(String.valueOf(fundResult.getPeriod_5Y()));
//        response.setBmPeriod3M(String.valueOf(fundResult.getBm_Period_3M()));
//        response.setBmPeriod6M(String.valueOf(fundResult.getBm_Period_6M()));
//        response.setBmPeriod1Y(String.valueOf(fundResult.getBm_Period_1Y()));
//        response.setBmPeriod3Y(String.valueOf(fundResult.getBm_Period_3Y()));
//        response.setBmPeriod5Y(String.valueOf(fundResult.getBm_Period_5Y()));
//        response.setClassPriceStatusList(classPriceStatusList);
//        response.setMarketStatusList(marketStatusList);
//        response.setPlanDetails(operationPlan.getPlanDetails());
//        response.setCommentary(operationResults.getCommentary());
//
//        return response;
//    }
//}
