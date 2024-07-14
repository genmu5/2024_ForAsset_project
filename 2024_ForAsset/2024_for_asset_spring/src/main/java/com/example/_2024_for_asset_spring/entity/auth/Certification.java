package com.example._2024_for_asset_spring.entity.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Certification {

    @Id
    private String memberEmail;
    private String certificationNumber;

    public Certification(String memberEmail, String certificationNumber) {
        this.memberEmail = memberEmail;
        this.certificationNumber = certificationNumber;
    }
}
