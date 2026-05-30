package com.gdaniele_art.pinggo.service;

import com.gdaniele_art.pinggo.dto.auth.AuthResponse;
import com.gdaniele_art.pinggo.dto.setup.SetupAdminRequest;

public interface SetupService {

    AuthResponse createFirstAdmin(SetupAdminRequest request);
}