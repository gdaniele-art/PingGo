package com.gdaniele_art.pinggo.dto;

import java.time.Instant;

import com.gdaniele_art.pinggo.entity.CheckLog.StatusService;
import jakarta.validation.constraints.*;

public class CheckResultRequest {
    @NotNull
    @Positive
    private Long agentId;

    @NotBlank
    @Size(max =40, message ="A service key must not exceed 40 characters")
    private String serviceKey;

    @NotNull
    private StatusService status;

    @Positive
    private Integer httpStatusCode;

    @PositiveOrZero
    @NotNull
    private Long latencyMs;

    @Size(max =1000)
    private String errorMessage;

    @NotNull
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
    public StatusService getStatus() {
        return status;
    }
    public void setStatus(StatusService status) {
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

    public CheckResultRequest(Long agentId, Instant checkedAt, Long latencyMs, StatusService status, 
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
