package com.gdaniele_art.pinggo.dto;

import com.gdaniele_art.pinggo.entity.MonitoredService.Method;
import jakarta.validation.constraints.*;

public class CreateMonitoredServiceRequest {

    @NotBlank(message = "Service key is required")
    @Size(max = 40, message = "Service key must not exceed 40 characters")
    @Pattern(
            regexp = "^[a-zA-Z0-9_-]+$",
            message = "Service key can only contain letters, numbers, underscores and hyphens"
    )
    private String serviceKey;

    @NotBlank(message = "Name is required")
    @Size(max = 80, message = "Name must not exceed 80 characters")
    private String name;

    @NotBlank(message = "URL is required")
    @Size(max = 500, message = "URL must not exceed 500 characters")
    private String url;

    @NotNull(message = "Check method is required")
    private Method checkMethod;

    @NotNull(message = "Agent ID is required")
    @Positive(message = "Agent ID must be positive")
    private Long agentId;

    public String getServiceKey(){
    return this.serviceKey;
    }
    public void setServiceKey(String serviceKey){
        this.serviceKey = serviceKey;
    }
    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getUrl(){
        return this.url;
    }
    public void setUrl(String url){
        this.url = url;
    }
    public Method getCheckMethod(){
        return this.checkMethod;
    }
    public void setCheckMethod(Method checkMethod){
        this.checkMethod = checkMethod;
    }
    public Long getAgentId(){
        return this.agentId;
    }
    public void setAgentId(Long agentId){
        this.agentId = agentId;
    }

    public CreateMonitoredServiceRequest(){}

    public CreateMonitoredServiceRequest(String serviceKey,String name,String url,Method checkMethod,Long agentId){
    this.serviceKey = serviceKey;
    this.name = name;
    this.url = url;
    this.checkMethod = checkMethod;
    this.agentId = agentId;
    }

    
}
