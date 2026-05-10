package com.gdaniele_art.pinggo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Builder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "agents")

public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private boolean enabled = false;

    @OneToMany(mappedBy = "agent")
    private List<MonitoredService> monitoredServices = new ArrayList<>();

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
    public List<MonitoredService> getMonitoredServices(){
        return this.monitoredServices;
    }
    public void setMonitoredServices(List<MonitoredService> monitoredServices){
        this.monitoredServices = monitoredServices;
    }
    public Agent(){

    }
    
    @Builder
    public Agent(String name,String description){
        this.name = name;
        this.description = description;
    }
}
