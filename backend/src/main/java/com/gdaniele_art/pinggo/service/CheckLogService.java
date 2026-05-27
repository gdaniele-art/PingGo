package com.gdaniele_art.pinggo.service;

import com.gdaniele_art.pinggo.dto.CheckLogResponse;
import com.gdaniele_art.pinggo.dto.CheckResultRequest;

import java.util.List;

public interface CheckLogService {
    CheckLogResponse registerCheckResult(CheckResultRequest request);

    CheckLogResponse getLastLogByServiceKey(String serviceKey);

    CheckLogResponse getLastLogByMonitoredServiceId(Long monitoredServiceId);

    List<CheckLogResponse> getRecentLogsByServiceKey(String serviceKey);

    List<CheckLogResponse> getRecentLogsByMonitoredServiceId(Long monitoredServiceId);

    List<CheckLogResponse> getRecentLogs();

}
