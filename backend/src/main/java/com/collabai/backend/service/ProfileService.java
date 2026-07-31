package com.collabai.backend.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.dto.ProfileResponse;
import com.collabai.backend.entity.User;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.repository.UserRepository;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileResponse getProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new ProfileResponse(
                user.getFullName(),
                user.getEmail()
        );
    }
}