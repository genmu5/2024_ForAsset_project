package com.example._2024_for_asset_spring.dto.django;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NewsSummary {
    private Long id;
    private String title;
    private String content;
    private String summary; // 이 필드는 'summary'와 매핑됨
    private LocalDateTime publishedAt;
}

