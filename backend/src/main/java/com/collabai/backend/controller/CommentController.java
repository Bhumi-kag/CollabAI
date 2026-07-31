package com.collabai.backend.controller;

import com.collabai.backend.dto.CommentResponse;
import com.collabai.backend.dto.CreateCommentRequest;
import com.collabai.backend.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Add Comment
    @PostMapping
    public CommentResponse addComment(
            @Valid @RequestBody CreateCommentRequest request,
            Authentication authentication) {

        return commentService.addComment(request, authentication);
    }

    // Get Comments of a Task
    @GetMapping("/task/{taskId}")
    public List<CommentResponse> getCommentsByTask(
            @PathVariable Long taskId) {

        return commentService.getCommentsByTask(taskId);
    }
}