package com.collabai.backend.controller;

import com.collabai.backend.dto.AssignTaskRequest;
import com.collabai.backend.dto.CreateTaskRequest;
import com.collabai.backend.dto.TaskResponse;
import com.collabai.backend.dto.UpdateTaskStatusRequest;
import com.collabai.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Create Task
    @PostMapping
    public TaskResponse createTask(
            @Valid @RequestBody CreateTaskRequest request) {

        return taskService.createTask(request);
    }

    // Get Tasks by Workspace
    @GetMapping("/workspace/{workspaceId}")
    public List<TaskResponse> getTasksByWorkspace(
            @PathVariable Long workspaceId) {

        return taskService.getTasksByWorkspace(workspaceId);
    }

    // Assign Task
    @PutMapping("/{taskId}/assign")
    public TaskResponse assignTask(
            @PathVariable Long taskId,
            @Valid @RequestBody AssignTaskRequest request) {

        return taskService.assignTask(taskId, request);
    }

    // Update Task Status
    @PutMapping("/{taskId}/status")
    public TaskResponse updateTaskStatus(
            @PathVariable Long taskId,
            @Valid @RequestBody UpdateTaskStatusRequest request) {

        return taskService.updateTaskStatus(taskId, request);
    }
}