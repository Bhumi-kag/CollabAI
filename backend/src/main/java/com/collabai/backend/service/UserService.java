package com.collabai.backend.service;

import com.collabai.backend.dto.LoginRequest;
import com.collabai.backend.dto.RegisterRequest;
import com.collabai.backend.dto.UpdateProfileRequest;
import com.collabai.backend.dto.UserResponse;
import com.collabai.backend.entity.User;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.repository.UserRepository;
import com.collabai.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // ==========================
    // Register
    // ==========================

    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully!";
    }

    // ==========================
    // Login
    // ==========================

    public String loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User not found!";
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid password!";
        }

        return jwtService.generateToken(user.getEmail());
    }

    // ==========================
    // Get Profile
    // ==========================

    public UserResponse getProfile(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }

    // ==========================
    // Update Profile
    // ==========================

    public UserResponse updateProfile(
            UpdateProfileRequest request,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        user.setFullName(request.getFullName());

        User updatedUser = userRepository.save(user);

        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getFullName(),
                updatedUser.getEmail()
        );
    }
}