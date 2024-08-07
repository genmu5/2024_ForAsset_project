package com.example._2024_for_asset_spring.controller.report;

import com.example._2024_for_asset_spring.entity.report.*;
import com.example._2024_for_asset_spring.service.report.FundService;
import com.example._2024_for_asset_spring.service.report.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.List;


@Controller
public class FundController {
    @Autowired
    private FundService fundService;

    @GetMapping("/fund-report")
    public String getFundReport(
            @RequestParam String fundName,
            @RequestParam String operationPeriod,
            @RequestParam(defaultValue = "report_template") String templateName,
            Model model) {

        String decodedFundName = URLDecoder.decode(fundName, StandardCharsets.UTF_8);
        String decodedOperationPeriod = URLDecoder.decode(operationPeriod, StandardCharsets.UTF_8);

        FundOverview fundOverview = fundService.getFundOverview(decodedFundName, decodedOperationPeriod);
        FundNames fundNames = fundService.getFundNames(decodedFundName, decodedOperationPeriod);
        FundResult fundResult = fundService.getFundResult(decodedFundName, decodedOperationPeriod);
        AnnualReturns annualReturns = fundService.getAnnualReturns(decodedFundName, decodedOperationPeriod);
        List<ClassPriceStatus> classPriceStatusList = fundService.getClassPriceStatusByFundNameAndOperationPeriod(decodedFundName, decodedOperationPeriod);
        List<MarketStatus> marketStatusList = fundService.getMarketStatusByFundNameAndOperationPeriod(decodedFundName, decodedOperationPeriod);
        OperationPlan operationPlan = fundService.getOperationPlan(decodedFundName, decodedOperationPeriod);
        OperationResults operationResults = fundService.getOperationResults(decodedFundName, decodedOperationPeriod);

        if (fundNames == null) {
            throw new ResourceNotFoundException("Fund not found");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String settingDate = sdf.format(fundNames.getSettingDate());

        model.addAttribute("fundName", fundNames.getFundName());
        model.addAttribute("operationPeriod", fundNames.getOperationPeriod());
        model.addAttribute("settingDate", settingDate);
        model.addAttribute("trustFee", fundNames.getTrustFee());
        model.addAttribute("operationSize", fundNames.getOperationSize());
        model.addAttribute("salesMethod", fundNames.getSalesMethod());
        model.addAttribute("benchmark", fundNames.getBenchmark());
        model.addAttribute("investmentObjective", fundNames.getInvestmentObjective());

        model.addAttribute("period3M", fundResult != null && fundResult.getPeriod_3M() != null ? fundResult.getPeriod_3M() : "-");
        model.addAttribute("period6M", fundResult != null && fundResult.getPeriod_6M() != null ? fundResult.getPeriod_6M() : "-");
        model.addAttribute("period1Y", fundResult != null && fundResult.getPeriod_1Y() != null ? fundResult.getPeriod_1Y() : "-");
        model.addAttribute("period3Y", fundResult != null && fundResult.getPeriod_3Y() != null ? fundResult.getPeriod_3Y() : "-");
        model.addAttribute("period5Y", fundResult != null && fundResult.getPeriod_5Y() != null ? fundResult.getPeriod_5Y() : "-");
        model.addAttribute("bmPeriod3M", fundResult != null && fundResult.getBm_Period_3M() != null ? fundResult.getBm_Period_3M() : "-");
        model.addAttribute("bmPeriod6M", fundResult != null && fundResult.getBm_Period_6M() != null ? fundResult.getBm_Period_6M() : "-");
        model.addAttribute("bmPeriod1Y", fundResult != null && fundResult.getBm_Period_1Y() != null ? fundResult.getBm_Period_1Y() : "-");
        model.addAttribute("bmPeriod3Y", fundResult != null && fundResult.getBm_Period_3Y() != null ? fundResult.getBm_Period_3Y() : "-");
        model.addAttribute("bmPeriod5Y", fundResult != null && fundResult.getBm_Period_5Y() != null ? fundResult.getBm_Period_5Y() : "-");

        model.addAttribute("annualReturns", annualReturns);

        model.addAttribute("fundtype", fundOverview.getFundType());
        model.addAttribute("settingDate", fundOverview.getSettingDate());
        model.addAttribute("risklevel", fundOverview.getRiskLevel());

        model.addAttribute("classPriceStatusList", classPriceStatusList);

        model.addAttribute("marketStatusList", marketStatusList);
        model.addAttribute("planDetails", operationPlan.getPlanDetails());
        model.addAttribute("commentary", operationResults.getCommentary());
        return templateName;
    }
}

