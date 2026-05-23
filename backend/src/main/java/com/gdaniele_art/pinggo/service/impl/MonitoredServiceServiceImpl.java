package com.gdaniele_art.pinggo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdaniele_art.pinggo.dto.CreateMonitoredServiceRequest;
import com.gdaniele_art.pinggo.dto.MonitoredServiceResponse;
import com.gdaniele_art.pinggo.entity.Agent;
import com.gdaniele_art.pinggo.entity.MonitoredService;
import com.gdaniele_art.pinggo.mapper.MonitoredServiceMapper;
import com.gdaniele_art.pinggo.repository.AgentRepository;
import com.gdaniele_art.pinggo.repository.MonitoredServiceRepository;
import com.gdaniele_art.pinggo.service.MonitoredServiceService;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class MonitoredServiceServiceImpl implements MonitoredServiceService{

    @Autowired
    private MonitoredServiceRepository monitoredServiceRepository;

    @Autowired
    private MonitoredServiceMapper monitoredServiceMapper;

    @Autowired
    private AgentRepository agentRepository;


    @Override
    @Transactional

    public MonitoredServiceResponse createMonitoredService(CreateMonitoredServiceRequest request){
        if(request == null) throw new RuntimeException("Invalid request");
        if (request.getCheckMethod() == null)  throw new RuntimeException("Method cannot be null");
        String requestKey= request.getServiceKey();

        if(requestKey == null || requestKey.isBlank()) throw new RuntimeException("ServiceKey is required");

        if(monitoredServiceRepository.existsByServiceKey(requestKey)) throw new RuntimeException("Service key already exist");

        Long agentId = request.getAgentId();
        if(agentId == null) throw new RuntimeException("AgentId is required");

        Agent agent = agentRepository.findById(agentId)
                        .orElseThrow(() ->  new RuntimeException("Agent not found"));

        MonitoredService monitoredService = monitoredServiceMapper.toEntity(request, agent);

        if(monitoredService == null) throw new RuntimeException("Invalid monitoredService");
        MonitoredService savedMonitoredService = monitoredServiceRepository.save(monitoredService);

        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(savedMonitoredService);

        return response;
    }

    @Override
    public List<MonitoredServiceResponse> getAllMonitoredServices() {
        List<MonitoredService> monitoredServices = monitoredServiceRepository.findAll();
        List<MonitoredServiceResponse> responses = monitoredServices.stream()
                .map(monitoredServiceMapper::toResponse)
                .toList();
        return responses;
    }

    @Override
    public MonitoredServiceResponse getMonitoredServiceById(Long id) {
        if(id == null) throw new IllegalArgumentException("Id cannot be null");
        MonitoredService monitoredService = monitoredServiceRepository.findById(id)
                                            .orElseThrow(()-> new RuntimeException("Monitored service not found"));
        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(monitoredService);
        return response;
    }

    @Override
    public MonitoredServiceResponse getMonitoredServiceByServiceKey(String serviceKey) {
        MonitoredService monitoredService = monitoredServiceRepository.findByServiceKey(serviceKey)
                                            .orElseThrow(()-> new RuntimeException("Monitored service not found"));
        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(monitoredService);
        return response;
    }

    @Override
    @Transactional

    public MonitoredServiceResponse enableMonitoredService(Long id) {
        if(id == null) throw new IllegalArgumentException("Id cannot be null");
        MonitoredService monitoredService = monitoredServiceRepository.findById(id)
                                            .orElseThrow(()-> new RuntimeException("Monitored service not found"));
        monitoredService.setEnabled(true);
        MonitoredService savedMonitoredService = monitoredServiceRepository.save(monitoredService);
        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(savedMonitoredService);
        return response;
    }

    @Override
    @Transactional

    public MonitoredServiceResponse disableMonitoredService(Long id) {
        if(id == null) throw new IllegalArgumentException("Id cannot be null");
        MonitoredService monitoredService = monitoredServiceRepository.findById(id)
                                            .orElseThrow(()-> new RuntimeException("Monitored service not found"));
        monitoredService.setEnabled(false);
        MonitoredService savedMonitoredService = monitoredServiceRepository.save(monitoredService);
        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(savedMonitoredService);
        return response;
    }

    @Override
    @Transactional

    public void deleteMonitoredService(Long id) {
        if(id == null) throw new IllegalArgumentException("Id cannot be null");
        MonitoredService monitoredService = monitoredServiceRepository.findById(id)
                                            .orElseThrow(()-> new RuntimeException("Monitored service not found"));
        if (monitoredService.getCheckLogs() != null && !monitoredService.getCheckLogs().isEmpty()) 
            throw new RuntimeException("Monitored service cannot be deleted because it has check logs");

        monitoredServiceRepository.delete(monitoredService);
    }
}
