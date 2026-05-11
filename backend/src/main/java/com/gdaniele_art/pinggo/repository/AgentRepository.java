package com.gdaniele_art.pinggo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdaniele_art.pinggo.entity.Agent;

public interface AgentRepository extends JpaRepository<Agent, Long> {
    
}
