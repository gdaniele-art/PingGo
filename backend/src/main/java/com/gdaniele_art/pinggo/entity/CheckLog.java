package com.gdaniele_art.pinggo.entity;


import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Builder;


@Entity
@Table(name="check_logs")
public class CheckLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="monitored_service_id",nullable = false)
    private MonitoredService monitoredService;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)

    private StatusService status;

    public enum StatusService{
        UP,
        DOWN
    }

    @Column(nullable = true, name ="http_status_code")
    private Integer httpStatusCode;

    @Column(nullable = false)
    private Long latencyMs;
    
    @Column(nullable=true,name ="error_message")
    private String errorMessage;
    
    @Column(nullable = false, name="checked_at")
    private Instant checkedAt;

    @Column(nullable = false, name ="received_at")
    private Instant receivedAt;


    public Long getId() {
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public MonitoredService getMonitoredService() {
        return monitoredService;
    }

    public void setMonitoredService(MonitoredService monitoredService) {
        this.monitoredService = monitoredService;
    }
    public StatusService getStatus() {
        return status;
    }
    public void setStatus(StatusService status) {
        this.status = status;
    }
    public Integer getHttpStatusCode() {
        return httpStatusCode;
    }
    public void setHttpStatusCode(Integer httpStatusCode) {
        this.httpStatusCode = httpStatusCode;
    }
    public Long getLatencyMs() {
        return latencyMs;
    }
    public void setLatencyMs(Long latencyMs) {
        this.latencyMs = latencyMs;
    }
    public String getErrorMessage() {
        return errorMessage;
    }
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    public Instant getCheckedAt() {
        return checkedAt;
    }
    public void setCheckedAt(Instant checkedAt) {
        this.checkedAt = checkedAt;
    }
    public Instant getReceivedAt(){
        return this.receivedAt;
    }
    public void setReceivedAt(Instant receivedAt){
        this.receivedAt = receivedAt;
    }

    public CheckLog(){

    }

    @Builder
    public CheckLog(MonitoredService monitoredService,StatusService status,Integer httpStatusCode, 
        Long latencyMs, String errorMessage, Instant checkedAt){
            this.monitoredService = monitoredService;
            this.status = status;
            this.httpStatusCode = httpStatusCode;
            this.latencyMs = latencyMs;
            this.errorMessage = errorMessage;
            this.checkedAt = checkedAt;
        }

    @PrePersist
    public void prePersist(){
        if(this.receivedAt == null) receivedAt = Instant.now();
    }
}
