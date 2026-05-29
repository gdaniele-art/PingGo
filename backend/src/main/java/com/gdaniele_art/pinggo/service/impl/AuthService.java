package com.gdaniele_art.pinggo.service.impl;

import com.gdaniele_art.pinggo.dto.auth.AuthResponse;
import com.gdaniele_art.pinggo.dto.auth.LoginRequest;
import com.gdaniele_art.pinggo.security.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;

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
}