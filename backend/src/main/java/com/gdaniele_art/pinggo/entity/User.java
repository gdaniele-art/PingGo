package com.gdaniele_art.pinggo.entity;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Table(name = "users")
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, name="created_at", updatable = false)
    private Instant createdAt;

    private Instant updatedAt = null;

    @Column(nullable = false)
    private boolean enabled = true;


    @Column(nullable = false)
    private String password;


    public enum Role{
        ADMIN,
        VIEWER
    }

    public UUID getId(){
        return this.id;
    }
    public void setId(UUID id){
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
    public Instant getUpdatedAt(){
        return this.updatedAt;
    }
    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User(Role role,String email, String password
    ){
        this.role = role;
        this.email = email;
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
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }
}
