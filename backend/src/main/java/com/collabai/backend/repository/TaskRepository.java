package com.collabai.backend.repository;

import com.collabai.backend.entity.Task;
import com.collabai.backend.enums.TaskStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByWorkspaceId(Long workspaceId);

    long countByStatus(TaskStatus status);

}