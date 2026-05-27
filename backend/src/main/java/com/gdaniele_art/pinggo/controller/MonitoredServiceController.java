package com.gdaniele_art.pinggo.controller;

import java.net.URI;
import java.util.List;

import com.gdaniele_art.pinggo.dto.UpdateMonitoredServiceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gdaniele_art.pinggo.dto.CreateMonitoredServiceRequest;
import com.gdaniele_art.pinggo.dto.MonitoredServiceResponse;
import com.gdaniele_art.pinggo.service.MonitoredServiceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/services")
public class MonitoredServiceController {
    
    @Autowired
    private MonitoredServiceService monitoredServiceService;

    @PostMapping
    public ResponseEntity<MonitoredServiceResponse> createMonitoredService(@Valid @RequestBody CreateMonitoredServiceRequest request){
        MonitoredServiceResponse createdMonitoredServiceResponse = monitoredServiceService.createMonitoredService(request);

        URI location = URI.create("/api/services/"+ createdMonitoredServiceResponse.getId() );

        return ResponseEntity.created(location).body(createdMonitoredServiceResponse);
    }

    @GetMapping
    public ResponseEntity<List<MonitoredServiceResponse>> getAllMonitoredServices(){
        return ResponseEntity.ok(monitoredServiceService.getAllMonitoredServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonitoredServiceResponse> getMonitoredServiceById(@PathVariable Long id){
        return ResponseEntity.ok(monitoredServiceService.getMonitoredServiceById(id));
    }

    @GetMapping("/key/{serviceKey}")
    public ResponseEntity<MonitoredServiceResponse> getMonitoredServiceByServiceKey(@PathVariable String serviceKey){
        return ResponseEntity.ok(monitoredServiceService.getMonitoredServiceByServiceKey(serviceKey));
    }

    @PatchMapping("{id}/enable")
    public ResponseEntity<MonitoredServiceResponse> enableMonitoredService(@PathVariable Long id){
        return ResponseEntity.ok(monitoredServiceService.enableMonitoredService(id));
    }

    @PatchMapping("{id}/disable")
    public ResponseEntity<MonitoredServiceResponse> disableMonitoredService(@PathVariable Long id){
        return ResponseEntity.ok(monitoredServiceService.disableMonitoredService(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonitoredService(@PathVariable Long id){
        monitoredServiceService.deleteMonitoredService(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<MonitoredServiceResponse> updateMonitoredService(@PathVariable Long id, @Valid @RequestBody UpdateMonitoredServiceRequest request) {
        return ResponseEntity.ok(monitoredServiceService.updateMonitoredService(id, request));
    }
}

