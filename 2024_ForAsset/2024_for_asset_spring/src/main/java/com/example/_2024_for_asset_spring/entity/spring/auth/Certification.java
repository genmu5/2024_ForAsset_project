package com.example._2024_for_asset_spring.entity.spring.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="certification")
public class Certification {

    @Id
    @Column(name = "member_email")
    private String memberEmail;
    @Column(name = "certification_number")
    private String certificationNumber;

    public Certification(String memberEmail, String certificationNumber) {
        this.memberEmail = memberEmail;
        this.certificationNumber = certificationNumber;
    }
}
