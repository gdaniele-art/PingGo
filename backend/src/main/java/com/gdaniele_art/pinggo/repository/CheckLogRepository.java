package com.gdaniele_art.pinggo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdaniele_art.pinggo.entity.CheckLog;

public interface CheckLogRepository extends JpaRepository<CheckLog, Long>{
    Optional<CheckLog> findTopByMonitoredService_ServiceKeyOrderByCheckedAtDesc(String serviceKey);

    Optional<CheckLog> findTopByMonitoredService_IdOrderByCheckedAtDesc(Long monitoredServiceId);

    List<CheckLog> findTop50ByMonitoredService_ServiceKeyOrderByCheckedAtDesc(String serviceKey);
    
    List<CheckLog> findTop50ByMonitoredService_IdOrderByCheckedAtDesc(Long monitoredServiceId);

    List<CheckLog> findTop15ByOrderByCheckedAtDesc();
}
