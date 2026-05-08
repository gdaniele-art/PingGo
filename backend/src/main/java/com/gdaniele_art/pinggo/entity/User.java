package com.gdaniele_art.pinggo.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //later this need to be UIID
    
    @Enumerated(EnumType.STRING) // 
    private Role role;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, name="created_at")
    private Instant createdAt;

    @Column(nullable = false)
    private boolean enabled = true;


    @Column(nullable = false)
    private String password;


    public enum Role{
        ADMIN,
        VIEWER
    }

    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;      
    }
    public Role getRole(){
        return this.role;
    }
    public void setRole(Role role){
        this.role = role;
    }
    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email=email;
    }
    public Instant getCreatedAt(){
        return this.createdAt;
    }
    public void setCreatedAt(Instant createdAt){
        this.createdAt = createdAt;
    }
    public boolean isEnabled(){
        return this.enabled;
    }
    public void setEnabled(boolean enabled){
        this.enabled = enabled;
    }
    public String getPassword(){
        return this.password;
    }
    public void setPassword(String password){
        this.password = password;
    }

    public User(Role role,String email
        ,boolean enabled, String password
    ){
        this.role = role;
        this.email = email;
        this.enabled = enabled;
        this.password = password;
    }
    
    public User(){

    }
    @PrePersist
    public void prePersist(){
        if(this.createdAt == null){
        this.createdAt = Instant.now();
        }
        if(this.role == null){
            this.role = Role.VIEWER;
        }
    }
}
