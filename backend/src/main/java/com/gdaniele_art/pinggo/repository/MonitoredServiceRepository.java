package com.gdaniele_art.pinggo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdaniele_art.pinggo.entity.MonitoredService;

public interface MonitoredServiceRepository extends JpaRepository<MonitoredService, Long> {
    
    boolean existsByServiceKey(String serviceKey);

    Optional<MonitoredService> findByServiceKey(String serviceKey);

    Optional<MonitoredService> findByServiceKeyAndAgentId(String serviceKey, Long agentId);

    List<MonitoredService> findByAgent_IdAndEnabledTrue(Long agentId);
    
}
