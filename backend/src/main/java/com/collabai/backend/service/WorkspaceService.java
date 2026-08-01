package com.collabai.backend.service;

import com.collabai.backend.dto.CreateWorkspaceRequest;
import com.collabai.backend.dto.WorkspaceResponse;
import com.collabai.backend.entity.User;
import com.collabai.backend.entity.Workspace;
import com.collabai.backend.entity.WorkspaceMember;
import com.collabai.backend.enums.WorkspaceRole;
import com.collabai.backend.exception.ResourceNotFoundException;
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
    private final ActivityService activityService;

    public WorkspaceService(WorkspaceRepository workspaceRepository,
                            UserRepository userRepository,
                            WorkspaceMemberRepository workspaceMemberRepository,
                            ActivityService activityService) {

        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
        this.activityService = activityService;
    }

    // Create Workspace
    public WorkspaceResponse createWorkspace(CreateWorkspaceRequest request,
                                             Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Workspace workspace = new Workspace();

        workspace.setName(request.getName());
        workspace.setDescription(request.getDescription());
        workspace.setCreatedBy(user);

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        // Automatically add creator as OWNER
        WorkspaceMember owner = new WorkspaceMember();
        owner.setWorkspace(savedWorkspace);
        owner.setUser(user);
        owner.setRole(WorkspaceRole.OWNER);

        workspaceMemberRepository.save(owner);

        // Log Activity
        activityService.logActivity(
                savedWorkspace,
                "Workspace Created",
                user.getFullName()
        );

        return new WorkspaceResponse(
                savedWorkspace.getId(),
                savedWorkspace.getName(),
                savedWorkspace.getDescription(),
                savedWorkspace.getCreatedBy().getFullName()
        );
    }

    // Get My Workspaces
    public List<WorkspaceResponse> getMyWorkspaces(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Workspace> workspaces =
                workspaceRepository.findByCreatedById(user.getId());

        return workspaces.stream()
                .map(workspace -> new WorkspaceResponse(
                        workspace.getId(),
                        workspace.getName(),
                        workspace.getDescription(),
                        workspace.getCreatedBy().getFullName()
                ))
                .collect(Collectors.toList());
    }
}