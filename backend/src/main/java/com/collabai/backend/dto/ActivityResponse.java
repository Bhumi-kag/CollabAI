package com.collabai.backend.dto;

import java.time.LocalDateTime;

public class ActivityResponse {

    private Long id;
    private String action;
    private String performedBy;
    private LocalDateTime createdAt;

    public ActivityResponse() {
    }

    public ActivityResponse(Long id,
                            String action,
                            String performedBy,
                            LocalDateTime createdAt) {

        this.id = id;
        this.action = action;
        this.performedBy = performedBy;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}