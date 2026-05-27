package com.gdaniele_art.pinggo.service.impl;

import java.util.List;

import com.gdaniele_art.pinggo.dto.UpdateAgentRequest;
import com.gdaniele_art.pinggo.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdaniele_art.pinggo.dto.AgentResponse;
import com.gdaniele_art.pinggo.dto.CreateAgentRequest;
import com.gdaniele_art.pinggo.entity.Agent;
import com.gdaniele_art.pinggo.mapper.AgentMapper;
import com.gdaniele_art.pinggo.repository.AgentRepository;
import com.gdaniele_art.pinggo.service.AgentService;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AgentServiceImpl implements AgentService {
    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private AgentMapper agentMapper;

    @Override
    @Transactional

    public AgentResponse createAgent(CreateAgentRequest request){
        if(request == null) throw new NotFoundException("agent does not exist");

        Agent agent = agentMapper.toEntity(request);

        if(agent == null) throw new NotFoundException("agent not found");
        Agent savedAgent = agentRepository.save(agent);

        return agentMapper.toResponse(savedAgent);

    }

    @Override
    public List<AgentResponse> getAllAgents(){
        List<Agent> agents = agentRepository.findAll();
        List<AgentResponse> agentsResponse = agents.stream()
                .map(agentMapper::toResponse)
                .toList();
        return agentsResponse;
    }

    @Override
    public AgentResponse getAgentById(Long id){
        if(id == null) throw new IllegalArgumentException("Agent id cannot be null");


        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Agent not found")); //I need a Exception more specific

        AgentResponse response = agentMapper.toResponse(agent);

        return response;
    }
    
    @Override
    @Transactional

    public AgentResponse enableAgent(Long id){
        if(id == null) throw new IllegalArgumentException("Agent id cannot be null");


        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Agent not found"));
        
        agent.setEnabled(true);
        
        Agent updatedAgent =agentRepository.save(agent);

        AgentResponse response = agentMapper.toResponse(updatedAgent);

        return response;
    }

    @Override
    @Transactional

    public AgentResponse disableAgent(Long id){
        if(id == null) throw new IllegalArgumentException("Agent id cannot be null");

        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException( "Agent not found"));
        
        agent.setEnabled(false);
        
        Agent updatedAgent =agentRepository.save(agent);

        AgentResponse response = agentMapper.toResponse(updatedAgent);

        return response;
    }

    @Override
    @Transactional

    public void deleteAgent(Long id){
        if(id == null) throw new IllegalArgumentException("Agent id cannot be null");


        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Agent not found"));
        
        if(agent.getMonitoredServices() != null && !agent.getMonitoredServices().isEmpty()){
        throw new IllegalArgumentException("Agent cannot be deleted because it has one or more services");
        }

        agentRepository.deleteById(id);

    }

    @Override
    @Transactional
    public AgentResponse updateAgent(Long id, UpdateAgentRequest request) {
        if (id == null) {
            throw new IllegalArgumentException("Agent id cannot be null");
        }
        Agent agent = agentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Agent not found"));

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Agent name cannot be empty");
        }

        agent.setName(request.getName().trim());
        agent.setDescription(request.getDescription());

        return agentMapper.toResponse(agent);
    }
    
}
