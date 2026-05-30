package com.gdaniele_art.pinggo.dto;

public class AgentTokenResponse {
    private Long agentId;
    private String token;
    private Long expiresAt;

    public AgentTokenResponse() {
    }

    public AgentTokenResponse(Long agentId, String token, Long expiresAt) {
        this.agentId = agentId;
        this.token = token;
        this.expiresAt = expiresAt;
    }
    public Long getAgentId() {
        return agentId;
    }
    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public Long getExpiresAt() {
        return expiresAt;
    }
    public void setExpiresAt(Long expiresAt) {
        this.expiresAt = expiresAt;
    }
}