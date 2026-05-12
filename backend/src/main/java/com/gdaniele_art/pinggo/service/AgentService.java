package com.gdaniele_art.pinggo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdaniele_art.pinggo.dto.AgentResponse;
import com.gdaniele_art.pinggo.dto.CreateAgentRequest;
import com.gdaniele_art.pinggo.entity.Agent;
import com.gdaniele_art.pinggo.mapper.AgentMapper;
import com.gdaniele_art.pinggo.repository.AgentRepository;

@Service
public class AgentService {
    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private AgentMapper agentMapper;

    public AgentResponse createAgent(CreateAgentRequest request){
        if(request == null) throw new RuntimeException("agent does not exist");

        Agent agent = agentMapper.toEntity(request);

        if(agent == null) throw new RuntimeException("Agent invalid");
        Agent savedAgent = agentRepository.save(agent);

        return agentMapper.toResponse(savedAgent);

    }

    public List<AgentResponse> getAllAgents(){
        List<Agent> agents = agentRepository.findAll();
        List<AgentResponse> agentsResponse = new ArrayList<>();
        for(Agent agent: agents){
            AgentResponse agentResponse = agentMapper.toResponse(agent);
            agentsResponse.add(agentResponse);
        }

        return agentsResponse;
    }
    public AgentResponse getAgentById(Long id){
        if(id == null) throw new RuntimeException("Agent id cannot be null");


        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Agent not found")); //I need a Exception more specific

        AgentResponse response = agentMapper.toResponse(agent);

        return response;
    }
    
    public AgentResponse enableAgent(Long id){
        if(id == null) throw new RuntimeException("Agent id cannot be null");


        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Agent not found"));
        
        agent.setEnabled(true);
        
        Agent updatedAgent =agentRepository.save(agent);

        AgentResponse response = agentMapper.toResponse(updatedAgent);

        return response;
    }

    public AgentResponse disableAgent(Long id){
        if(id == null) throw new RuntimeException("Agent id cannot be null");

        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Agent not found"));
        
        agent.setEnabled(false);
        
        Agent updatedAgent =agentRepository.save(agent);

        AgentResponse response = agentMapper.toResponse(updatedAgent);

        return response;
    }

    public void deleteAgent(Long id){
        if(id == null) throw new RuntimeException("Agent id cannot be null");


        Agent agent = agentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Agent not found"));
        
        if(agent.getMonitoredServices() != null && !agent.getMonitoredServices().isEmpty()){
        throw new RuntimeException("Agent cannot be deleted because it has one or more services");
        }

        agentRepository.deleteById(id);

    }
    
}
