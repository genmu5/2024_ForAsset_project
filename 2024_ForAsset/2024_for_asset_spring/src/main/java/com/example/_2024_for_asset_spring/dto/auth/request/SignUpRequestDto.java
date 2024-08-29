package com.example._2024_for_asset_spring.dto.auth.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String certificationNumber;

    @NotBlank
    private String nickName;

    @NotBlank
    private String role;
}
