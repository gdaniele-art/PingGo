package com.gdaniele_art.pinggo.mapper;

import org.springframework.stereotype.Component;

import com.gdaniele_art.pinggo.dto.AgentResponse;
import com.gdaniele_art.pinggo.dto.CreateAgentRequest;
import com.gdaniele_art.pinggo.entity.Agent;

@Component
public class AgentMapper {
    public Agent toEntity(CreateAgentRequest agentRequest){
        if (agentRequest == null) return null;

        return Agent.builder()
                .name(agentRequest.getName())
                .description(agentRequest.getDescription())
                .build();
    }

    public AgentResponse toResponse(Agent agent){
        if (agent == null) return null;

        return AgentResponse.builder()
                .id(agent.getId())
                .name(agent.getName())
                .description(agent.getDescription())
                .enabled(agent.isEnabled())
                .servicesCount(agent.getMonitoredServices().size())
                .build();
    }
}
