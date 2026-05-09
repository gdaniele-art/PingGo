package com.gdaniele_art.pinggo.dto;

import java.time.Instant;


import com.gdaniele_art.pinggo.entity.MonitoredService.Method;

public class CheckLogResponse {
    private Long id;
    private Long monitoredServiceId;
    private String serviceKey;
    private String serviceName;
    private Method status;
    private Integer httpStatusCode;
    private Long latencyMs;
    private String errorMessage;
    private Instant checkedAt;
    private Instant receivedAt;

    public Instant getCheckedAt() {
        return checkedAt;
    }
    public void setCheckedAt(Instant checkedAt) {
        this.checkedAt = checkedAt;
    }
    public Instant getReceivedAt() {
        return receivedAt;
    }
    public void setReceivedAt(Instant receivedAt) {
        this.receivedAt = receivedAt;
    }
    public String getErrorMessage() {
        return errorMessage;
    }
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    public Method getStatus() {
        return status;
    }
    public void setStatus(Method status) {
        this.status = status;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getServiceKey() {
        return serviceKey;
    }
    public void setServiceKey(String serviceKey) {
        this.serviceKey = serviceKey;
    }
    public Long getMonitoredServiceId() {
        return monitoredServiceId;
    }
    public void setMonitoredServiceId(Long monitoredServiceId) {
        this.monitoredServiceId = monitoredServiceId;
    }
    public String getServiceName() {
        return serviceName;
    }
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
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

    public CheckLogResponse(Long id, Instant receivedAt, Instant checkedAt, String errorMessage,
                            Long latencyMs, Integer httpStatusCode, Method status, String serviceName, String serviceKey, Long monitoredServiceId) {
        this.id = id;
        this.receivedAt = receivedAt;
        this.checkedAt = checkedAt;
        this.errorMessage = errorMessage;
        this.latencyMs = latencyMs;
        this.httpStatusCode = httpStatusCode;
        this.status = status;
        this.serviceName = serviceName;
        this.serviceKey = serviceKey;
        this.monitoredServiceId = monitoredServiceId;
    }

    public CheckLogResponse(){}
}
