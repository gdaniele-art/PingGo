package com.gdaniele_art.pinggo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdaniele_art.pinggo.entity.MonitoredService;

public interface MonitoredServiceRepository extends JpaRepository<MonitoredService, Long> {
    
}
