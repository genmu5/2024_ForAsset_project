package com.example._2024_for_asset_spring.common;

public interface ResponseMessage {

    String SUCCESS = "Success";

    String VALIDATION_FAIL = "Validation failed";
    String DUPLICATE_EMAIL = "Duplicate Email";

    String SIGN_IN_FAIL = "Login information mismatch";
    String CERTIFICATION_FAIL = "Certification failed";

    String MAIL_FAIL = "Mail send failed";
    String DATABASE_ERROR = "Database error";
}
