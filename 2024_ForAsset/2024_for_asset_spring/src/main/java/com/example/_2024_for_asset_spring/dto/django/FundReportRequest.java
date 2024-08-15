package com.example._2024_for_asset_spring.dto.django;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FundReportRequest {
    private String fundName;
    private String operationPeriod; // 수정된 부분
    private List<String> newsSummaries;
}
