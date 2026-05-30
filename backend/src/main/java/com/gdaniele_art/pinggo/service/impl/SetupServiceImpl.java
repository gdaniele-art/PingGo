package com.gdaniele_art.pinggo.service.impl;

import com.gdaniele_art.pinggo.dto.auth.AuthResponse;
import com.gdaniele_art.pinggo.dto.setup.SetupAdminRequest;
import com.gdaniele_art.pinggo.entity.User;
import com.gdaniele_art.pinggo.exception.DuplicateResourceException;
import com.gdaniele_art.pinggo.repository.UserRepository;
import com.gdaniele_art.pinggo.security.AuthUser;
import com.gdaniele_art.pinggo.security.JwtTokenService;
import com.gdaniele_art.pinggo.service.SetupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SetupServiceImpl implements SetupService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Override
    @Transactional
    public AuthResponse createFirstAdmin(SetupAdminRequest request) {
        if (userRepository.existsByRole(User.Role.ADMIN)) {
            throw new IllegalStateException("Initial admin already exists");
        }

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("Email already exists");
        }

        User admin = new User(User.Role.ADMIN, email, passwordEncoder.encode(request.getPassword()));

        User savedAdmin = userRepository.save(admin);

        AuthUser authUser = new AuthUser(savedAdmin);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(authUser, null, authUser.getAuthorities());

        String token = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(token);

        return new AuthResponse(token, savedAdmin.getEmail(), expiresAt);
    }
}