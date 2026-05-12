package com.gdaniele_art.pinggo.mapper;

import org.springframework.stereotype.Component;

import com.gdaniele_art.pinggo.dto.CreateMonitoredServiceRequest;
import com.gdaniele_art.pinggo.dto.MonitoredServiceResponse;
import com.gdaniele_art.pinggo.entity.Agent;
import com.gdaniele_art.pinggo.entity.MonitoredService;

@Component
public class MonitoredServiceMapper {
    public MonitoredService toEntity(CreateMonitoredServiceRequest montiroredServiceRequest, Agent agent){
        if(montiroredServiceRequest == null) throw new RuntimeException("Invalid request");

        return MonitoredService.builder()
                .name(montiroredServiceRequest.getName())
                .url(montiroredServiceRequest.getUrl())
                .serviceKey(montiroredServiceRequest.getServiceKey())
                .checkMethod(montiroredServiceRequest.getCheckMethod())
                .agent(agent)
                .build();
    }

    public MonitoredServiceResponse toResponse(MonitoredService monitoredService){
        if(monitoredService == null) throw new RuntimeException("Invalid monitoredService");

        return MonitoredServiceResponse.builder()
                .id(monitoredService.getId())
                .serviceKey(monitoredService.getServiceKey())
                .name(monitoredService.getName())
                .url(monitoredService.getUrl())
                .checkMethod(monitoredService.getCheckMethod())
                .enabled(monitoredService.isEnabled())
                .agentId(monitoredService.getAgent().getId())
                .agentName(monitoredService.getAgent().getName())
                .build();

    }
}
