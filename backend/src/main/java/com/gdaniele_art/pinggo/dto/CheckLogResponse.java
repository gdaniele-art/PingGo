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
    
}
