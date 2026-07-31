package com.collabai.backend.service;

import com.collabai.backend.dto.LoginRequest;
import com.collabai.backend.dto.RegisterRequest;
import com.collabai.backend.entity.User;
import com.collabai.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.collabai.backend.security.JwtService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User Registered Successfully!";
    }

    public String loginUser(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return "User not found!";
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return "Invalid password!";
    }

    String token = jwtService.generateToken(user.getEmail());

return token;
}

@Autowired
private JwtService jwtService;
}

