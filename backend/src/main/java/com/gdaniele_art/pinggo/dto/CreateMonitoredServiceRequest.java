package com.gdaniele_art.pinggo.dto;

import com.gdaniele_art.pinggo.entity.MonitoredService.Method;

public class CreateMonitoredServiceRequest {
    private String serviceKey;
    private String name;
    private String url;
    private Method checkMethod;
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
