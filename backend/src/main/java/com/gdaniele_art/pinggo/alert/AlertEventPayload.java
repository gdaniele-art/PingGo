package com.gdaniele_art.pinggo.alert;

import com.gdaniele_art.pinggo.entity.CheckLog.StatusService;

import java.time.Instant;

public class AlertEventPayload {
    public enum AlertEventType {
        SERVICE_DOWN,
        SERVICE_RECOVERED
    }

    private AlertEventType eventType;
    private Long agentId;
    private String agentName;
    private Long monitoredServiceId;
    private String serviceKey;
    private String serviceName;
    private StatusService previousStatus;
    private StatusService currentStatus;
    private Integer httpStatusCode;
    private Long latencyMs;
    private String errorMessage;
    private Instant checkedAt;

    public AlertEventType getEventType() {
        return eventType;
    }

    public void setEventType(AlertEventType eventType) {
        this.eventType = eventType;
    }

    public Long getAgentId() {
        return agentId;
    }
    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }
    public String getAgentName() {
        return agentName;
    }
    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }
    public Long getMonitoredServiceId() {
        return monitoredServiceId;
    }
    public void setMonitoredServiceId(Long monitoredServiceId) {
        this.monitoredServiceId = monitoredServiceId;
    }
    public String getServiceKey() {
        return serviceKey;
    }
    public void setServiceKey(String serviceKey) {
        this.serviceKey = serviceKey;
    }
    public String getServiceName() {
        return serviceName;
    }
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    public StatusService getPreviousStatus() {
        return previousStatus;
    }
    public void setPreviousStatus(StatusService previousStatus) {
        this.previousStatus = previousStatus;
    }
    public StatusService getCurrentStatus() {
        return currentStatus;
    }
    public void setCurrentStatus(StatusService currentStatus) {
        this.currentStatus = currentStatus;
    }
    public Integer getHttpStatusCode() {
        return httpStatusCode;
    }
    public void setHttpStatusCode(Integer httpStatusCode) {
        this.httpStatusCode = httpStatusCode;
    }
    public Long getLatencyMs() {
        return latencyMs;
    }
    public void setLatencyMs(Long latencyMs) {
        this.latencyMs = latencyMs;
    }
    public String getErrorMessage() {
        return errorMessage;
    }
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    public Instant getCheckedAt() {
        return checkedAt;
    }
    public void setCheckedAt(Instant checkedAt) {
        this.checkedAt = checkedAt;
    }
}