package com.example._2024_for_asset_spring.controller.report;

import com.example._2024_for_asset_spring.entity.report.FundNames;
import com.example._2024_for_asset_spring.entity.report.FundOverview;
import com.example._2024_for_asset_spring.service.report.FundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class FundController {

    @Autowired
    private FundService fundService;

    @GetMapping("/fund-report")
    public String getFundReport(Model model) {
        List<FundOverview> fundOverviews = fundService.getAllFundOverviews();
        List<FundNames> fundNames = fundService.getAllFundNames();

        // 로그 추가
        System.out.println("Fund Overviews in Controller: " + (fundOverviews != null ? fundOverviews : "No fund overviews found"));
        System.out.println("Fund Names in Controller: " + (fundNames != null ? fundNames : "No fund names found"));

        model.addAttribute("fundOverviews", fundOverviews != null ? fundOverviews : new ArrayList<>());
        model.addAttribute("fundNames", fundNames != null ? fundNames : new ArrayList<>());

        return "report_template";
    }
}
