package com.gdaniele_art.pinggo.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdaniele_art.pinggo.dto.CheckLogResponse;
import com.gdaniele_art.pinggo.dto.CheckResultRequest;
import com.gdaniele_art.pinggo.service.CheckLogService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/agent")
public class AgentReportController {

    @Autowired
    private CheckLogService checkLogService;

    @PostMapping("/check-results")
    public ResponseEntity<CheckLogResponse> receiveCheckResult(@Valid @RequestBody CheckResultRequest request){
        CheckLogResponse createdChecklog = checkLogService.registerCheckResult(request);

        return ResponseEntity.status(201).body(createdChecklog);

    }
}
