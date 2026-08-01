package com.collabai.backend.service;

import com.collabai.backend.dto.DashboardResponse;
import com.collabai.backend.enums.TaskStatus;
import com.collabai.backend.repository.TaskRepository;
import com.collabai.backend.repository.WorkspaceMemberRepository;
import com.collabai.backend.repository.WorkspaceRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final WorkspaceRepository workspaceRepository;
    private final TaskRepository taskRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;

    public DashboardService(WorkspaceRepository workspaceRepository,
                            TaskRepository taskRepository,
                            WorkspaceMemberRepository workspaceMemberRepository) {

        this.workspaceRepository = workspaceRepository;
        this.taskRepository = taskRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
    }

    public DashboardResponse getDashboard() {

        long totalWorkspaces = workspaceRepository.count();
        long totalTasks = taskRepository.count();
        long todoTasks = taskRepository.countByStatus(TaskStatus.TODO);
        long inProgressTasks = taskRepository.countByStatus(TaskStatus.IN_PROGRESS);
        long completedTasks = taskRepository.countByStatus(TaskStatus.DONE);
        long totalMembers = workspaceMemberRepository.count();

        return new DashboardResponse(
                totalWorkspaces,
                totalTasks,
                todoTasks,
                inProgressTasks,
                completedTasks,
                totalMembers
        );
    }
}