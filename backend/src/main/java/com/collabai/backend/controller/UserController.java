package com.collabai.backend.controller;

import com.collabai.backend.dto.UpdateProfileRequest;
import com.collabai.backend.dto.UserResponse;
import com.collabai.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ==========================
    // Get Logged-in User Profile
    // ==========================

    @GetMapping("/me")
    public UserResponse getProfile(
            Authentication authentication) {

        return userService.getProfile(authentication);
    }

    // ==========================
    // Update Profile
    // ==========================

    @PutMapping("/me")
    public UserResponse updateProfile(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {

        return userService.updateProfile(
                request,
                authentication
        );
    }
}