package com.gdaniele_art.pinggo.mapper;

import org.springframework.stereotype.Component;

import com.gdaniele_art.pinggo.dto.CheckLogResponse;
import com.gdaniele_art.pinggo.dto.CheckResultRequest;
import com.gdaniele_art.pinggo.entity.CheckLog;
import com.gdaniele_art.pinggo.entity.MonitoredService;

import java.util.ArrayList;
import java.util.List;

@Component
public class CheckLogMapper {
    
    public CheckLog toEntity(CheckResultRequest checkRequest, MonitoredService monitoredService){
        if(checkRequest == null) return null;
        return CheckLog.builder()
                .monitoredService(monitoredService)
                .status(checkRequest.getStatus())
                .httpStatusCode(checkRequest.getHttpStatusCode())
                .latencyMs(checkRequest.getLatencyMs())
                .errorMessage(checkRequest.getErrorMessage())
                .checkedAt(checkRequest.getCheckedAt())
                .build();

    }
    public CheckLogResponse toResponse(CheckLog checkLog){
        if (checkLog == null) return null;
        return CheckLogResponse.builder()
                .id(checkLog.getId())
                .receivedAt(checkLog.getReceivedAt())
                .checkedAt(checkLog.getCheckedAt())
                .errorMessage(checkLog.getErrorMessage())
                .latencyMs(checkLog.getLatencyMs())
                .httpStatusCode(checkLog.getHttpStatusCode())
                .status(checkLog.getStatus())
                .serviceName(checkLog.getMonitoredService().getName())
                .serviceKey(checkLog.getMonitoredService().getServiceKey())
                .monitoredServiceId(checkLog.getMonitoredService().getId())
                .build();
    }

    public List<CheckLogResponse> toResponseList(List<CheckLog> checklogs){
        if (checklogs == null) return null;
        List<CheckLogResponse> checklogsResponse = new ArrayList<>();
        checklogsResponse = checklogs.stream()
                            .map(this::toResponse)
                            .toList();

        return checklogsResponse;
    }
}
