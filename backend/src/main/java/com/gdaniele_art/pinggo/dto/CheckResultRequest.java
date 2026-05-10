package com.gdaniele_art.pinggo.dto;

import java.time.Instant;

import com.gdaniele_art.pinggo.entity.MonitoredService.Method;

public class CheckResultRequest {
    private Long agentId;
    private String serviceKey;
    private Method status;
    private Integer httpStatusCode;
    private Long latencyMs;
    private String errorMessage;
    private Instant checkedAt;

    public Instant getCheckedAt() {
        return checkedAt;
    }
    public void setCheckedAt(Instant checkedAt) {
        this.checkedAt = checkedAt;
    }
    public Long getAgentId() {
        return agentId;
    }
    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }
    public String getServiceKey() {
        return serviceKey;
    }
    public void setServiceKey(String serviceKey) {
        this.serviceKey = serviceKey;
    }
    public Method getStatus() {
        return status;
    }
    public void setStatus(Method status) {
        this.status = status;
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

    public CheckResultRequest(Long agentId, Instant checkedAt, Long latencyMs, Method status, 
        Integer httpStatusCode, String serviceKey, String errorMessage) {
        this.agentId = agentId;
        this.checkedAt = checkedAt;
        this.latencyMs = latencyMs;
        this.status = status;
        this.httpStatusCode = httpStatusCode;
        this.serviceKey = serviceKey;
        this.errorMessage = errorMessage;
    }

    public CheckResultRequest(){}
}
