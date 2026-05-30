package com.gdaniele_art.pinggo.controller;

import com.gdaniele_art.pinggo.dto.auth.AuthResponse;
import com.gdaniele_art.pinggo.dto.setup.SetupAdminRequest;
import com.gdaniele_art.pinggo.service.SetupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/setup")
@RequiredArgsConstructor
public class SetupController {

    private final SetupService setupService;

    @PostMapping("/admin")
    public ResponseEntity<AuthResponse> createFirstAdmin(@Valid @RequestBody SetupAdminRequest request) {
        AuthResponse response = setupService.createFirstAdmin(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}