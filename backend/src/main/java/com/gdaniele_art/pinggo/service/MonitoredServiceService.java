package com.gdaniele_art.pinggo.service;

import java.util.List;

import com.gdaniele_art.pinggo.dto.CreateMonitoredServiceRequest;
import com.gdaniele_art.pinggo.dto.MonitoredServiceResponse;

public interface MonitoredServiceService {

    MonitoredServiceResponse createMonitoredService(CreateMonitoredServiceRequest request);

    List<MonitoredServiceResponse> getAllMonitoredServices();

    MonitoredServiceResponse getMonitoredServiceById(Long id);

    MonitoredServiceResponse getMonitoredServiceByServiceKey(String serviceKey);

    MonitoredServiceResponse enableMonitoredService(Long id);

    MonitoredServiceResponse disableMonitoredService(Long id);

    void deleteMonitoredService(Long id);

    List<MonitoredServiceResponse> getMonitoredServicesByAgentId(Long agentId);

    List<MonitoredServiceResponse> getEnabledMonitoredServicesByAgentId(Long agentId);
}
