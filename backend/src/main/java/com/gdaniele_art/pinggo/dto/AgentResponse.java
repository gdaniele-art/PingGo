package com.gdaniele_art.pinggo.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;

public class AgentResponse {
    private Long id;
    private String name;
    private String description;
    private boolean enabled;
    private int servicesCount;
    private List<MonitoredServiceResponse> services = new ArrayList<>();

    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getDescription(){
        return this.description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public boolean isEnabled(){
        return this.enabled;
    }
    public void setEnabled(boolean enabled){
        this.enabled = enabled;
    }
    public int getServicesCount(){
        return this.servicesCount;
    }
    public void setServicesCount(int servicesCount){
        this.servicesCount = servicesCount;
    }
    public List<MonitoredServiceResponse> getServices(){
        return this.services;
    }
    public void setServices(List<MonitoredServiceResponse> services){
        this.services = services;
    }
    
    public AgentResponse(){}

    @Builder
    public AgentResponse(Long id, String name, String description, boolean enabled, int servicesCount){
        this.id = id;
        this.name = name;
        this.description = description;
        this.enabled = enabled;
        this.servicesCount = servicesCount;
    }
    
}
