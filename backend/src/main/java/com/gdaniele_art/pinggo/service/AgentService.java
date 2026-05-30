package com.gdaniele_art.pinggo.service;

import java.util.List;

import com.gdaniele_art.pinggo.dto.AgentResponse;
import com.gdaniele_art.pinggo.dto.AgentTokenResponse;
import com.gdaniele_art.pinggo.dto.CreateAgentRequest;
import com.gdaniele_art.pinggo.dto.UpdateAgentRequest;

public interface AgentService {

    AgentResponse createAgent(CreateAgentRequest request);

    List<AgentResponse> getAllAgents();

    AgentResponse getAgentById(Long id);

    AgentResponse enableAgent(Long id);

    AgentResponse disableAgent(Long id);
    
    void deleteAgent(Long id);

    AgentResponse updateAgent(Long id, UpdateAgentRequest request);

    AgentTokenResponse generateAgentToken(Long id);
}
