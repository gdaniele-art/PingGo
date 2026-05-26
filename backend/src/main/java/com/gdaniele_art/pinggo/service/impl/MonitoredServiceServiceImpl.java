package com.gdaniele_art.pinggo.service.impl;

import com.gdaniele_art.pinggo.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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
        if(request == null) throw new IllegalArgumentException("Invalid request");
        if (request.getCheckMethod() == null)  throw new IllegalArgumentException("Method cannot be null");
        String requestKey= request.getServiceKey();

        if(requestKey == null || requestKey.isBlank()) throw new IllegalArgumentException ("ServiceKey is required");

        if(monitoredServiceRepository.existsByServiceKey(requestKey)) throw new DuplicateKeyException("Service key already exist");

        Long agentId = request.getAgentId();
        if(agentId == null) throw new IllegalArgumentException("AgentId is required");

        Agent agent = agentRepository.findById(agentId)
                        .orElseThrow(() ->  new NotFoundException("Agent not found"));

        MonitoredService monitoredService = monitoredServiceMapper.toEntity(request, agent);

        if(monitoredService == null) throw new IllegalArgumentException("Invalid monitoredService");
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
                                            .orElseThrow(()-> new NotFoundException("Monitored service not found"));
        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(monitoredService);
        return response;
    }

    @Override
    public MonitoredServiceResponse getMonitoredServiceByServiceKey(String serviceKey) {
        MonitoredService monitoredService = monitoredServiceRepository.findByServiceKey(serviceKey)
                                            .orElseThrow(()-> new NotFoundException("Monitored service not found"));
        MonitoredServiceResponse response = monitoredServiceMapper.toResponse(monitoredService);
        return response;
    }

    @Override
    @Transactional

    public MonitoredServiceResponse enableMonitoredService(Long id) {
        if(id == null) throw new IllegalArgumentException("Id cannot be null");
        MonitoredService monitoredService = monitoredServiceRepository.findById(id)
                                            .orElseThrow(()-> new NotFoundException("Monitored service not found"));
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
                                            .orElseThrow(()-> new NotFoundException("Monitored service not found"));
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
                                            .orElseThrow(()-> new NotFoundException("Monitored service not found"));
        if (monitoredService.getCheckLogs() != null && !monitoredService.getCheckLogs().isEmpty()) 
            throw new IllegalStateException("Monitored service cannot be deleted because it has check logs");

        monitoredServiceRepository.delete(monitoredService);
    }

    @Override
    public List<MonitoredServiceResponse> getMonitoredServicesByAgentId(Long agentId) {
        if(agentId == null) throw new IllegalArgumentException("Agent id cannot be null");

        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new NotFoundException("Agent not found"));
        if(!agent.isEnabled()) throw new IllegalStateException("Agent is disabled");

        List<MonitoredService> monitoredServices = monitoredServiceRepository.findByAgent_IdAndEnabledTrue(agentId);
        return monitoredServices.stream()
                .map(monitoredServiceMapper::toResponse)
                .toList();
    }
}
