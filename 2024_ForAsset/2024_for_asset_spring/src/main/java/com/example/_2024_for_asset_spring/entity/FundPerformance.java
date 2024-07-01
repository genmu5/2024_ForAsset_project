package com.example._2024_for_asset_spring.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class FundPerformance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private String price;

    @Column(name = "change", nullable = false)
    private String change;

    @Column(name = "percent", nullable = false)
    private String percent;

    @Column(name = "type", nullable = false)
    private String type; // 상위, 상한가, 하한가 등

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public FundPerformance() {}

    public FundPerformance(String name, String price, String change, String percent, String type, LocalDateTime createdAt) {
        this.name = name;
        this.price = price;
        this.change = change;
        this.percent = percent;
        this.type = type;
        this.createdAt = createdAt;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

    public String getPercent() {
        return percent;
    }

    public void setPercent(String percent) {
        this.percent = percent;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
