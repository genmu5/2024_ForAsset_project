package com.example._2024_for_asset_spring.config.dbConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.example._2024_for_asset_spring.entity.django",
        entityManagerFactoryRef = "djangodbEntityManagerFactory",
        transactionManagerRef = "djangodbTransactionManager"
)
public class DjangoDbJpaConfig {
}
