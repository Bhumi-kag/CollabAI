package com.collabai.backend.service;

import com.collabai.backend.dto.AssignTaskRequest;
import com.collabai.backend.dto.CreateTaskRequest;
import com.collabai.backend.dto.TaskResponse;
import com.collabai.backend.dto.UpdateTaskStatusRequest;
import com.collabai.backend.entity.Task;
import com.collabai.backend.entity.User;
import com.collabai.backend.entity.Workspace;
import com.collabai.backend.enums.TaskStatus;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.repository.TaskRepository;
import com.collabai.backend.repository.UserRepository;
import com.collabai.backend.repository.WorkspaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       WorkspaceRepository workspaceRepository,
                       UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
    }

    // Create Task
    public TaskResponse createTask(CreateTaskRequest request) {

        Workspace workspace = workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(TaskStatus.TODO);
        task.setDueDate(request.getDueDate());
        task.setWorkspace(workspace);
        task.setAssignedTo(null);

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(
                savedTask.getId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.getStatus(),
                savedTask.getPriority(),
                savedTask.getDueDate(),
                savedTask.getWorkspace().getName(),
                null
        );
    }

    // Get Tasks by Workspace
    public List<TaskResponse> getTasksByWorkspace(Long workspaceId) {

        List<Task> tasks = taskRepository.findByWorkspaceId(workspaceId);

        return tasks.stream()
                .map(task -> new TaskResponse(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getPriority(),
                        task.getDueDate(),
                        task.getWorkspace().getName(),
                        task.getAssignedTo() != null
                                ? task.getAssignedTo().getFullName()
                                : null
                ))
                .collect(Collectors.toList());
    }

    // Assign Task
    public TaskResponse assignTask(Long taskId,
                                   AssignTaskRequest request) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        task.setAssignedTo(user);

        Task updatedTask = taskRepository.save(task);

        return new TaskResponse(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription(),
                updatedTask.getStatus(),
                updatedTask.getPriority(),
                updatedTask.getDueDate(),
                updatedTask.getWorkspace().getName(),
                updatedTask.getAssignedTo().getFullName()
        );
    }

    // Update Task Status
    public TaskResponse updateTaskStatus(Long taskId,
                                         UpdateTaskStatusRequest request) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        task.setStatus(TaskStatus.valueOf(request.getStatus()));

        Task updatedTask = taskRepository.save(task);

        return new TaskResponse(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription(),
                updatedTask.getStatus(),
                updatedTask.getPriority(),
                updatedTask.getDueDate(),
                updatedTask.getWorkspace().getName(),
                updatedTask.getAssignedTo() != null
                        ? updatedTask.getAssignedTo().getFullName()
                        : null
        );
    }
}