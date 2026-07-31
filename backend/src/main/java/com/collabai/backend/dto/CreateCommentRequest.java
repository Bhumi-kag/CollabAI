package com.collabai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateCommentRequest {

    @NotNull(message = "Task ID is required")
    private Long taskId;

    @NotBlank(message = "Comment cannot be empty")
    private String content;

    public CreateCommentRequest() {
    }

    public CreateCommentRequest(Long taskId, String content) {
        this.taskId = taskId;
        this.content = content;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}