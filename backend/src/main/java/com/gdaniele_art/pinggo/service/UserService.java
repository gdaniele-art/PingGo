package com.gdaniele_art.pinggo.service;

import com.gdaniele_art.pinggo.dto.user.CreateUserRequest;
import com.gdaniele_art.pinggo.dto.user.UpdateUserRoleRequest;
import com.gdaniele_art.pinggo.dto.user.UserResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse createUser(CreateUserRequest request);

    UserResponse enableUser(UUID id);

    UserResponse disableUser(UUID id);

    UserResponse updateUserRole(UUID id, UpdateUserRoleRequest request);
}