package com.gdaniele_art.pinggo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdaniele_art.pinggo.entity.CheckLog;

public interface CheckLogRepository extends JpaRepository<CheckLog, Long>{
    
}
