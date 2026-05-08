package com.gdaniele_art.pinggo.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="monitored_services")
public class MonitoredService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String serviceKey;

    @Column(nullable = false)
    private String name;

    @Column(nullable=false)
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Method checkMethod;

    public enum Method{
        HTTP_GET,
        PING
    }
    
    @Column(nullable = false)
    private boolean enabled = false;

    @ManyToOne
    @JoinColumn(name ="agent_id",nullable = false) // agent_id is the FK that appears in the db
    private Agent agent;

    public Long getId(){
        return this.id ;
    }
    public void setId(Long id){
        this.id = id;
    }
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
        this.name=name;
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
    public boolean isEnabled(){
        return this.enabled;
    }
    public void setEnabled(boolean enabled){
        this.enabled = enabled;
    }
    public Agent getAgent(){
        return this.agent;
    }
    public void setAgent(Agent agent){
        this.agent = agent;
    }

    public MonitoredService(){
    }
    public MonitoredService(String name, String url, String serviceKey,
        Method checkMethod, Agent agent
    ){
    this.name = name;
    this.url = url;
    this.serviceKey = serviceKey;
    this.checkMethod = checkMethod;
    this.agent = agent;
    }
}   
