package com.gdaniele_art.pinggo.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String email;
    private String password;
}