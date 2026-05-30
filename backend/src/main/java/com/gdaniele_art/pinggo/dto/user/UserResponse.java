package com.gdaniele_art.pinggo.dto.user;

import com.gdaniele_art.pinggo.entity.User;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserResponse {

    private UUID id;
    private String email;
    private User.Role role;
    private boolean enabled;
    private Instant createdAt;
    private Instant updatedAt;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public User.Role getRole() {
        return role;
    }
    public void setRole(User.Role role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}