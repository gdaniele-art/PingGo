package com.gdaniele_art.pinggo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateAgentRequest {
    @NotBlank(message = "Name is required")
    @Size(max = 80, message = "Name must not exceed 80 characters")
   private String name;

    @Size(max = 255, message = "Description must not exceed 255 characters")
   private String description;

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

    public CreateAgentRequest(){}

    public CreateAgentRequest(String name, String description){
        this.name = name;
        this.description = description;
    }
}
