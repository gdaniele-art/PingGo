package com.gdaniele_art.pinggo.controller;

import java.net.URI;
import java.util.List;

import com.gdaniele_art.pinggo.dto.MonitoredServiceResponse;
import com.gdaniele_art.pinggo.service.MonitoredServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.gdaniele_art.pinggo.dto.CheckLogResponse;
import com.gdaniele_art.pinggo.dto.CheckResultRequest;
import com.gdaniele_art.pinggo.service.CheckLogService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/agent")
public class AgentReportController {

    @Autowired
    private CheckLogService checkLogService;

    @Autowired
    private MonitoredServiceService monitoredServiceService;

    @PostMapping("/check-results")
    public ResponseEntity<CheckLogResponse> receiveCheckResult(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody CheckResultRequest request) {
        Long tokenAgentId = extractAgentId(jwt);

        if (!tokenAgentId.equals(request.getAgentId())) {
            throw new IllegalArgumentException("Agent id does not match token");
        }

        CheckLogResponse createdChecklog = checkLogService.registerCheckResult(request);

        return ResponseEntity.status(201).body(createdChecklog);
    }

    private Long extractAgentId(Jwt jwt) {Object agentIdClaim = jwt.getClaims().get("agentId");
        if (agentIdClaim instanceof Number number) {
            return number.longValue();
        }

        if (agentIdClaim instanceof String value) {
            return Long.valueOf(value);
        }

        throw new IllegalArgumentException("Invalid agent token");
    }

    @GetMapping("/services")
    public ResponseEntity<List<MonitoredServiceResponse>> getEnabledServices(@AuthenticationPrincipal Jwt jwt) {
        Long agentId = extractAgentId(jwt);
        return ResponseEntity.ok(monitoredServiceService.getEnabledMonitoredServicesByAgentId(agentId));
    }
}
