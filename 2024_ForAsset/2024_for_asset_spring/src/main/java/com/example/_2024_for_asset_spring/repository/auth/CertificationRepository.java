package com.example._2024_for_asset_spring.repository.auth;

import com.example._2024_for_asset_spring.entity.auth.Certification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, String> {

    Optional<Certification> findByMemberEmail(String email);

    @Transactional
    void deleteByMemberEmail(String email);
}
