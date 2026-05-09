package com.gdaniele_art.pinggo.dto;

import com.gdaniele_art.pinggo.entity.MonitoredService.Method;

public class MonitoredServiceResponse {
    private Long id;
    private String serviceKey;
    private String name;
    private String url;
    private Method checkMethod;
    private boolean enabled;
    private Long agentId;
    private String agentName;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getServiceKey() {
        return serviceKey;
    }
    public void setServiceKey(String serviceKey) {
        this.serviceKey = serviceKey;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public Method getCheckMethod() {
        return checkMethod;
    }
    public void setCheckMethod(Method checkMethod) {
        this.checkMethod = checkMethod;
    }
    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    public Long getAgentId() {
        return agentId;
    }
    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }
    public String getAgentName() {
        return agentName;
    }
    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }


    public MonitoredServiceResponse() {
    }

    
    public MonitoredServiceResponse(
            Long id, String serviceKey,String name,
            String url,Method checkMethod,boolean enabled, Long agentId,  String agentName
    ) {
        this.id = id;
        this.serviceKey = serviceKey;
        this.name = name;
        this.url = url;
        this.checkMethod = checkMethod;
        this.enabled = enabled;
        this.agentId = agentId;
        this.agentName = agentName;
    }
}
