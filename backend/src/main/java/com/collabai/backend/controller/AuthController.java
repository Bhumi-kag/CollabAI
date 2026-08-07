package com.collabai.backend.controller;

import com.collabai.backend.dto.LoginRequest;
import com.collabai.backend.dto.LoginRequest;
import com.collabai.backend.dto.RegisterRequest;
import com.collabai.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

   @PostMapping("/login")
public String login(@Valid @RequestBody LoginRequest request) {

    System.out.println("LOGIN CONTROLLER HIT");
    System.out.println("EMAIL : " + request.getEmail());

    return userService.loginUser(request);
}
}
