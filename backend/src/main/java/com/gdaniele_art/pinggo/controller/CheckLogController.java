package com.gdaniele_art.pinggo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdaniele_art.pinggo.dto.CheckLogResponse;
import com.gdaniele_art.pinggo.service.CheckLogService;

@RestController
@RequestMapping("/api/check-logs")
public class CheckLogController {
    @Autowired
    private CheckLogService checkLogService;

    @GetMapping("/recent")
    public ResponseEntity<List<CheckLogResponse>> getRecentLogs (){
        return ResponseEntity.ok(checkLogService.getRecentLogs());
    }

    @GetMapping("/service-key/{serviceKey}/last")
    public ResponseEntity<CheckLogResponse> getLastLogByServiceKey(@PathVariable String serviceKey){
        return ResponseEntity.ok(checkLogService.getLastLogByServiceKey(serviceKey));
    }
    
    @GetMapping("/service/{monitoredServiceId}/last")
    public ResponseEntity<CheckLogResponse> getLastLogByMonitoredServiceId(@PathVariable Long monitoredServiceId){
        return ResponseEntity.ok(checkLogService.getLastLogByMonitoredServiceId(monitoredServiceId));
    }

    @GetMapping("/service-key/{serviceKey}/recent")
    public ResponseEntity<List<CheckLogResponse>> getRecentLogsByServiceKey(@PathVariable String serviceKey){
        return ResponseEntity.ok(checkLogService.getRecentLogsByServiceKey(serviceKey));
    }

     @GetMapping("/service/{monitoredServiceId}/recent")
    public ResponseEntity<List<CheckLogResponse>> getRecentLogsByMonitoredServiceId(@PathVariable Long monitoredServiceId){
        return ResponseEntity.ok(checkLogService.getRecentLogsByMonitoredServiceId(monitoredServiceId));
    }
}
