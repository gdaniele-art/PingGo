package com.gdaniele_art.pinggo.dto;

import com.gdaniele_art.pinggo.entity.MonitoredService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateMonitoredServiceRequest {
    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Service URL is required")
    private String url;

    @NotNull(message = "Check method is required")
    private MonitoredService.Method checkMethod;

    @NotNull(message = "Agent id is required")
    private Long agentId;

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }
    public MonitoredService.Method getCheckMethod() {
        return checkMethod;
    }
    public Long getAgentId() {
        return agentId;
    }
}
