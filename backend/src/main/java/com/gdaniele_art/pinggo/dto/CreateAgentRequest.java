package com.gdaniele_art.pinggo.dto;

public class CreateAgentRequest {
    String name;
    String description;

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
