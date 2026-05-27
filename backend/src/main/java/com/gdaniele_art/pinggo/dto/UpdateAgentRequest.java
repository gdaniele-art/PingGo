package com.gdaniele_art.pinggo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateAgentRequest {

   @NotBlank(message = "Agent name is required")
    private String name;

    private String description;

    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
}