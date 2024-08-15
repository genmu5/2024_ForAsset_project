package com.example._2024_for_asset_spring.service.django;

import com.example._2024_for_asset_spring.dto.django.NewsSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsSummaryService {

    @Autowired
    @Qualifier("djangodbJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    public List<NewsSummary> getNewsSummaries(String keyword, LocalDateTime startDate, LocalDateTime endDate) {
        String sql = "SELECT * FROM summarizer_newsarticle WHERE summary LIKE ? AND article_date BETWEEN ? AND ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + keyword + "%", startDate, endDate}, new NewsSummaryRowMapper());
    }

    private static class NewsSummaryRowMapper implements RowMapper<NewsSummary> {
        @Override
        public NewsSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
            NewsSummary newsSummary = new NewsSummary();
            newsSummary.setId(rs.getLong("id"));
            newsSummary.setTitle(rs.getString("title"));
            newsSummary.setContent(rs.getString("content"));
            newsSummary.setSummary(rs.getString("summary")); // 'summary'를 'keywords'로 사용
            newsSummary.setPublishedAt(rs.getTimestamp("article_date").toLocalDateTime()); // 'article_date' 사용
            return newsSummary;
        }
    }

}
