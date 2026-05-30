package com.gdaniele_art.pinggo.service.impl;

import com.gdaniele_art.pinggo.dto.user.CreateUserRequest;
import com.gdaniele_art.pinggo.dto.user.UpdateUserRoleRequest;
import com.gdaniele_art.pinggo.dto.user.UserResponse;
import com.gdaniele_art.pinggo.entity.User;
import com.gdaniele_art.pinggo.exception.DuplicateResourceException;
import com.gdaniele_art.pinggo.exception.NotFoundException;
import com.gdaniele_art.pinggo.mapper.UserMapper;
import com.gdaniele_art.pinggo.repository.UserRepository;
import com.gdaniele_art.pinggo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toResponse).toList();
    }

    @Override
    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("Email already exists");
        }

        User user = new User(
                request.getRole(),
                email,
                passwordEncoder.encode(request.getPassword())
        );
        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional
    public UserResponse enableUser(UUID id) {
        User user = findUserById(id);
        user.setEnabled(true);

        return userMapper.toResponse(user);
    }

    @Override
    @Transactional
    public UserResponse disableUser(UUID id) {
        User user = findUserById(id);
        user.setEnabled(false);

        return userMapper.toResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateUserRole(UUID id, UpdateUserRoleRequest request) {
        User user = findUserById(id);
        user.setRole(request.getRole());

        return userMapper.toResponse(user);
    }

    private User findUserById(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("User id cannot be null");
        }

        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    }
}