package com.gdaniele_art.pinggo.mapper;

import com.gdaniele_art.pinggo.dto.user.UserResponse;
import com.gdaniele_art.pinggo.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}