package com.collabai.backend.controller;

import com.collabai.backend.dto.ProfileResponse;
import com.collabai.backend.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/api/profile")
    public ProfileResponse getProfile(Authentication authentication) {
        return profileService.getProfile(authentication);
    }
}