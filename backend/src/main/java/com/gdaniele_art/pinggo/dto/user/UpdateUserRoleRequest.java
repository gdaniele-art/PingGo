package com.gdaniele_art.pinggo.dto.user;

import com.gdaniele_art.pinggo.entity.User;
import jakarta.validation.constraints.NotNull;

public class UpdateUserRoleRequest {

    @NotNull(message = "Role cannot be null")
    private User.Role role;

    public User.Role getRole() {
        return role;
    }
    public void setRole(User.Role role) {
        this.role = role;
    }
}