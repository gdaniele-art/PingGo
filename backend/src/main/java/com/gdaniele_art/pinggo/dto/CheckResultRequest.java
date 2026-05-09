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
}
