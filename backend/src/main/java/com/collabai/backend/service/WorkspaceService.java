package com.collabai.backend.service;

import com.collabai.backend.dto.CreateWorkspaceRequest;
import com.collabai.backend.dto.WorkspaceResponse;
import com.collabai.backend.entity.User;
import com.collabai.backend.entity.Workspace;
import com.collabai.backend.entity.WorkspaceMember;
import com.collabai.backend.enums.TaskStatus;
import com.collabai.backend.enums.WorkspaceRole;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.repository.TaskRepository;
import com.collabai.backend.repository.UserRepository;
import com.collabai.backend.repository.WorkspaceMemberRepository;
import com.collabai.backend.repository.WorkspaceRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final TaskRepository taskRepository;
    private final ActivityService activityService;

    public WorkspaceService(
            WorkspaceRepository workspaceRepository,
            UserRepository userRepository,
            WorkspaceMemberRepository workspaceMemberRepository,
            TaskRepository taskRepository,
            ActivityService activityService) {

        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
        this.taskRepository = taskRepository;
        this.activityService = activityService;
    }

    // ==========================
    // Create Workspace
    // ==========================

    public WorkspaceResponse createWorkspace(
            CreateWorkspaceRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Workspace workspace = new Workspace();

        workspace.setName(request.getName());
        workspace.setDescription(request.getDescription());
        workspace.setCreatedBy(user);

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        WorkspaceMember owner = new WorkspaceMember();
        owner.setWorkspace(savedWorkspace);
        owner.setUser(user);
        owner.setRole(WorkspaceRole.OWNER);

        workspaceMemberRepository.save(owner);

        activityService.logActivity(
                savedWorkspace,
                "Workspace Created",
                user.getFullName()
        );

        return buildWorkspaceResponse(savedWorkspace);
    }

    // ==========================
    // Get My Workspaces
    // ==========================

    public List<WorkspaceResponse> getMyWorkspaces(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        List<Workspace> workspaces =
                workspaceRepository.findByCreatedById(user.getId());

        return workspaces.stream()
                .map(this::buildWorkspaceResponse)
                .collect(Collectors.toList());
    }

    // ==========================
    // Update Workspace
    // ==========================

    public WorkspaceResponse updateWorkspace(
            Long id,
            CreateWorkspaceRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Workspace not found"));

        if (!workspace.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Only the workspace owner can update this workspace."
            );
        }

        workspace.setName(request.getName());
        workspace.setDescription(request.getDescription());

        Workspace updatedWorkspace = workspaceRepository.save(workspace);

        activityService.logActivity(
                updatedWorkspace,
                "Workspace Updated",
                user.getFullName()
        );

        return buildWorkspaceResponse(updatedWorkspace);
    }

    // ==========================
    // Delete Workspace
    // ==========================

    public void deleteWorkspace(
            Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Workspace not found"));

        if (!workspace.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Only the workspace owner can delete this workspace."
            );
        }

        activityService.logActivity(
                workspace,
                "Workspace Deleted",
                user.getFullName()
        );

        workspaceRepository.delete(workspace);
    }

    // ==========================
    // Build Workspace Response
    // ==========================

    private WorkspaceResponse buildWorkspaceResponse(Workspace workspace) {

        long memberCount =
                workspaceMemberRepository.findByWorkspaceId(workspace.getId()).size();

        long taskCount =
                taskRepository.findByWorkspaceId(workspace.getId()).size();

        long completedTaskCount =
                taskRepository.findByWorkspaceId(workspace.getId())
                        .stream()
                        .filter(task -> task.getStatus() == TaskStatus.DONE)
                        .count();

        int progress = taskCount == 0
                ? 0
                : (int) ((completedTaskCount * 100) / taskCount);

        return new WorkspaceResponse(
                workspace.getId(),
                workspace.getName(),
                workspace.getDescription(),
                workspace.getCreatedBy().getFullName(),
                memberCount,
                taskCount,
                completedTaskCount,
                progress
        );
    }
}