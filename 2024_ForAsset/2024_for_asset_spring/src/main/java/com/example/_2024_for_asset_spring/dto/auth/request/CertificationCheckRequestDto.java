package com.example._2024_for_asset_spring.dto.auth.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CertificationCheckRequestDto {

    @NotBlank
    private String email;

    @NotBlank
    private String certificationNumber;
}
