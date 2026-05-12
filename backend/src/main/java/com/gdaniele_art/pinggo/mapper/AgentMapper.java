package com.gdaniele_art.pinggo.mapper;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gdaniele_art.pinggo.dto.AgentResponse;
import com.gdaniele_art.pinggo.dto.CreateAgentRequest;
import com.gdaniele_art.pinggo.dto.MonitoredServiceResponse;
import com.gdaniele_art.pinggo.entity.Agent;
import java.util.List;

@Component
public class AgentMapper {

    @Autowired
    private MonitoredServiceMapper monitoredServiceMapper;

    public Agent toEntity(CreateAgentRequest agentRequest){
        if (agentRequest == null) throw new RuntimeException("Invalid agent request");

        return Agent.builder()
                .name(agentRequest.getName())
                .description(agentRequest.getDescription())
                .build();
    }

    public AgentResponse toResponse(Agent agent){
        if (agent == null) throw new RuntimeException("Invalid agent");

        int servicesCount = agent.getMonitoredServices() == null ? 0: agent.getMonitoredServices().size();

        return AgentResponse.builder()
                .id(agent.getId())
                .name(agent.getName())
                .description(agent.getDescription())
                .enabled(agent.isEnabled())
                .servicesCount(servicesCount)
                .build();
    }

    public  AgentResponse toResponseWithService(Agent agent){
        if(agent == null) return null;

        List<MonitoredServiceResponse> services = new ArrayList<>();

        if(agent.getMonitoredServices() != null){
            services = agent.getMonitoredServices()
                        .stream()
                        .map(monitoredServiceMapper::toResponse)
                        .toList();
        }

        AgentResponse response = AgentResponse.builder()
                    .id(agent.getId())
                    .name(agent.getName())
                    .description(agent.getDescription())
                    .enabled(agent.isEnabled())
                    .servicesCount(services.size())
                    .build();

        response.setServices(services);

        return response;
    }
}
