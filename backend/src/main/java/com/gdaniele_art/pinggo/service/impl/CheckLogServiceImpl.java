package com.gdaniele_art.pinggo.service.impl;

import com.gdaniele_art.pinggo.dto.CheckLogResponse;
import com.gdaniele_art.pinggo.dto.CheckResultRequest;
import com.gdaniele_art.pinggo.entity.CheckLog;
import com.gdaniele_art.pinggo.entity.MonitoredService;
import com.gdaniele_art.pinggo.exception.NotFoundException;
import com.gdaniele_art.pinggo.mapper.CheckLogMapper;
import com.gdaniele_art.pinggo.repository.CheckLogRepository;
import com.gdaniele_art.pinggo.repository.MonitoredServiceRepository;
import com.gdaniele_art.pinggo.service.CheckLogService;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@Transactional(readOnly = true)
public class CheckLogServiceImpl implements CheckLogService{
    @Autowired
    private CheckLogRepository checkLogRepository;

    @Autowired
    private CheckLogMapper checkLogMapper;

    @Autowired
    private MonitoredServiceRepository monitoredServiceRepository;

    @Override
    @Transactional
    public CheckLogResponse registerCheckResult(CheckResultRequest request){
        if(request == null) throw new IllegalArgumentException("Request cannot be null");
        Long agentId = request.getAgentId();
        if(agentId == null) throw new IllegalArgumentException("AgentId cannot be null");

        String serviceKey = request.getServiceKey();
        if(serviceKey == null || serviceKey.isBlank()) throw new IllegalArgumentException("ServiceKey cannot be null");
        
        MonitoredService monitoredService = monitoredServiceRepository.findByServiceKeyAndAgentId(serviceKey, agentId)
            .orElseThrow(() -> new NotFoundException("Monitored service not found"));
        
        CheckLog checkLog = checkLogMapper.toEntity(request, monitoredService);

        if (checkLog == null) throw new IllegalArgumentException("Checklog cannot be null");

        checkLog = checkLogRepository.save(checkLog);

        return checkLogMapper.toResponse(checkLog);
    }

    @Override
    public CheckLogResponse getLastLogByServiceKey(String serviceKey) {
        if(serviceKey == null || serviceKey.isBlank()) throw new IllegalArgumentException("ServiceKey cannot be null");

        CheckLog checkLog = checkLogRepository.findTopByMonitoredService_ServiceKeyOrderByCheckedAtDesc(serviceKey)
            .orElseThrow(() -> new NotFoundException("Check log not found"));
        
        return checkLogMapper.toResponse(checkLog);
    }

    @Override
    public CheckLogResponse getLastLogByMonitoredServiceId(Long monitoredServiceId) {
        if(monitoredServiceId == null) throw new IllegalArgumentException("MonitoredServiceId cannot be null");

        CheckLog checkLog = checkLogRepository.findTopByMonitoredService_IdOrderByCheckedAtDesc(monitoredServiceId)
            .orElseThrow(() -> new NotFoundException("Check log not found"));
        
        return checkLogMapper.toResponse(checkLog);
    }

    @Override
    public List<CheckLogResponse> getRecentLogsByServiceKey(String serviceKey) {
        if(serviceKey == null || serviceKey.isBlank()) 
            throw new IllegalArgumentException("ServiceKey cannot be null");
        List<CheckLog> checkLogs = checkLogRepository.findTop50ByMonitoredService_ServiceKeyOrderByCheckedAtDesc(serviceKey);
        return checkLogMapper.toResponseList(checkLogs);
    }

    @Override
    public List<CheckLogResponse> getRecentLogsByMonitoredServiceId(Long monitoredServiceId) {
        if(monitoredServiceId == null) throw new IllegalArgumentException("MonitoredServiceId cannot be null");
        List<CheckLog> checkLogs = checkLogRepository.findTop50ByMonitoredService_IdOrderByCheckedAtDesc(monitoredServiceId);
        return checkLogMapper.toResponseList(checkLogs);
    }

    @Override
    public List<CheckLogResponse> getRecentLogs(){
        List<CheckLog> checklogs = checkLogRepository.findTop50ByOrderByCheckedAtDesc();

        return checkLogMapper.toResponseList(checklogs);
    }

    public List<CheckLogResponse> getErrorLogsByAgentId(Long agentId) {
    if(agentId == null) throw new IllegalArgumentException("AgentId cannot be null");

    List<CheckLog> checkLogs = checkLogRepository.findTop50ByMonitoredService_Agent_IdAndStatusOrderByCheckedAtDesc(
                    agentId,CheckLog.StatusService.DOWN);

        return checkLogMapper.toResponseList(checkLogs);
    }

}