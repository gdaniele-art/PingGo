package com.gdaniele_art.pinggo.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdaniele_art.pinggo.dto.AgentResponse;
import com.gdaniele_art.pinggo.dto.CreateAgentRequest;
import com.gdaniele_art.pinggo.service.AgentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/agents")
public class AgentController {
 
    @Autowired
    private AgentService agentService;

    @PostMapping
    public ResponseEntity<AgentResponse> createAgent(@Valid @RequestBody CreateAgentRequest request){
        AgentResponse createdAgent= agentService.createAgent(request);

        if (createdAgent.getId() == null) throw new IllegalStateException("Created agent id cannot be null");

        URI location = URI.create("/api/agents" + createdAgent.getId());


        return ResponseEntity.created(location).body(createdAgent);
    }

    @GetMapping
    public ResponseEntity<List<AgentResponse>> getAllAgents(){
        return ResponseEntity.ok(agentService.getAllAgents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgentResponse> getAgentById(@PathVariable Long id){
        return ResponseEntity.ok(agentService.getAgentById(id));
    }

    @PatchMapping("/{id}/enable")
    public ResponseEntity<AgentResponse> enableAgent(@PathVariable Long id){
        return ResponseEntity.ok(agentService.enableAgent(id));
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<AgentResponse> disableAgent(@PathVariable Long id){
        return ResponseEntity.ok(agentService.disableAgent(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable Long id){
        agentService.deleteAgent(id);
        return ResponseEntity.noContent().build();
    }

 
}