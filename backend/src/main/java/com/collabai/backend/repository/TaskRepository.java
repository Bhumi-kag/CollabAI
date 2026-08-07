package com.collabai.backend.repository;

import com.collabai.backend.entity.Task;
import com.collabai.backend.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // Get all tasks of a workspace
    List<Task> findByWorkspaceId(Long workspaceId);

    // Dashboard
    long countByStatus(TaskStatus status);

    // Workspace Statistics
    long countByWorkspaceId(Long workspaceId);

    long countByWorkspaceIdAndStatus(Long workspaceId, TaskStatus status);
}