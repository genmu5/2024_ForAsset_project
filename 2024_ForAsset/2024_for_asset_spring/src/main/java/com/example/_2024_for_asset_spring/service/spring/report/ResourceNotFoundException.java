package com.example._2024_for_asset_spring.service.spring.report;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}