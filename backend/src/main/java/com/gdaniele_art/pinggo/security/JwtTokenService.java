package com.gdaniele_art.pinggo.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    @Value("${jwt.expiration:3600}")
    private long userExpirationSeconds;

    @Value("${jwt.agent-expiration-seconds:7776000}")
    private long agentExpirationSeconds;

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(authority -> authority.replace("ROLE_", ""))
                .toList();

        JwtClaimsSet claims =  JwtClaimsSet.builder()
                .issuer("pinggo")
                .issuedAt(now)
                .expiresAt(now.plus(userExpirationSeconds, ChronoUnit.SECONDS))
                .subject(authentication.getName())
                .claim("roles", roles)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateAgentToken(Long agentId) {
        if (agentId == null) {
            throw new IllegalArgumentException("Agent id cannot be null");
        }

        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("pinggo")
                .issuedAt(now)
                .expiresAt(now.plus(agentExpirationSeconds, ChronoUnit.SECONDS))
                .subject("agent:" + agentId)
                .claim("roles", List.of("AGENT"))
                .claim("agentId", agentId)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Long extractExpirationTime(String token) {
        Jwt jwt = decoder.decode(token);

        if (jwt.getExpiresAt() == null) {
            return null;
        }

        return jwt.getExpiresAt().toEpochMilli();
    }
}
