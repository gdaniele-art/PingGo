package com.gdaniele_art.pinggo.service.impl;

import com.gdaniele_art.pinggo.dto.auth.AuthResponse;
import com.gdaniele_art.pinggo.dto.auth.LoginRequest;
import com.gdaniele_art.pinggo.dto.auth.RegisterRequest;
import com.gdaniele_art.pinggo.entity.User;
import com.gdaniele_art.pinggo.exception.DuplicateResourceException;
import com.gdaniele_art.pinggo.repository.UserRepository;
import com.gdaniele_art.pinggo.security.AuthUser;
import com.gdaniele_art.pinggo.security.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication token = UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        Authentication authentication = authenticationManager.authenticate(token);

        String jwtToken = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(jwtToken);

        return new AuthResponse(jwtToken, authentication.getName(), expiresAt);
    }
    public AuthResponse register(RegisterRequest registerRequest) {
        String email = registerRequest.getEmail().trim().toLowerCase();

        if(userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("Email already exists");
        }

        User user = new User(
                User.Role.VIEWER,
                email,
                passwordEncoder.encode(registerRequest.getPassword())
        );
        User savedUser = userRepository.save(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(
                new AuthUser(savedUser),
                null,
                new AuthUser(savedUser).getAuthorities()
        );

        String jwtToken = jwtTokenService.generateToken(authentication);
        Long expiresAt = jwtTokenService.extractExpirationTime(jwtToken);

        return new AuthResponse(jwtToken, savedUser.getEmail(), expiresAt);
    }
}