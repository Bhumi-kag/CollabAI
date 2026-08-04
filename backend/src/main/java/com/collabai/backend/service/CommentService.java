package com.collabai.backend.service;

import com.collabai.backend.dto.CommentResponse;
import com.collabai.backend.dto.CreateCommentRequest;
import com.collabai.backend.entity.Comment;
import com.collabai.backend.entity.Task;
import com.collabai.backend.entity.User;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.repository.CommentRepository;
import com.collabai.backend.repository.TaskRepository;
import com.collabai.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public CommentService(CommentRepository commentRepository,
                          TaskRepository taskRepository,
                          UserRepository userRepository,
                          NotificationService notificationService) {

        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    // Add Comment
    public CommentResponse addComment(CreateCommentRequest request,
                                      Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        Comment comment = new Comment();

        comment.setContent(request.getContent());
        comment.setTask(task);
        comment.setUser(user);

        Comment savedComment = commentRepository.save(comment);

        // Create notification for the assigned user
        if (task.getAssignedTo() != null &&
                !task.getAssignedTo().getId().equals(user.getId())) {

            notificationService.createNotification(
                    task.getAssignedTo(),
                    user.getFullName() + " commented on task: " + task.getTitle(),
                    "COMMENT"
            );
        }

        return new CommentResponse(
                savedComment.getId(),
                savedComment.getContent(),
                savedComment.getUser().getFullName()
        );
    }

    // Get Comments by Task
    public List<CommentResponse> getCommentsByTask(Long taskId) {

        List<Comment> comments = commentRepository.findByTaskId(taskId);

        return comments.stream()
                .map(comment -> new CommentResponse(
                        comment.getId(),
                        comment.getContent(),
                        comment.getUser().getFullName()
                ))
                .collect(Collectors.toList());
    }
}