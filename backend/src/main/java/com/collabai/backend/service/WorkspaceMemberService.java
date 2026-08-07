package com.collabai.backend.service;
import com.collabai.backend.exception.MemberAlreadyExistsException;

import com.collabai.backend.dto.InviteMemberRequest;
import com.collabai.backend.dto.WorkspaceMemberResponse;
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
public class WorkspaceMemberService {

    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final PermissionService permissionService;
    private final NotificationService notificationService;

    public WorkspaceMemberService(
            WorkspaceMemberRepository workspaceMemberRepository,
            WorkspaceRepository workspaceRepository,
            UserRepository userRepository,
            PermissionService permissionService,
            NotificationService notificationService) {

        this.workspaceMemberRepository = workspaceMemberRepository;
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
        this.permissionService = permissionService;
        this.notificationService = notificationService;
    }

    // Invite Member
    public WorkspaceMemberResponse inviteMember(
            InviteMemberRequest request,
            Authentication authentication) {

        Workspace workspace = workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        // Only OWNER or ADMIN can invite members
        permissionService.checkOwnerOrAdmin(
                workspace.getId(),
                authentication
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        workspaceMemberRepository
        .findByWorkspaceIdAndUserId(workspace.getId(), user.getId())
        .ifPresent(member -> {
            throw new MemberAlreadyExistsException(
                    "User is already a member of this workspace");
        });

        WorkspaceMember member = new WorkspaceMember();

        member.setWorkspace(workspace);
        member.setUser(user);
        member.setRole(WorkspaceRole.valueOf(request.getRole()));

        WorkspaceMember savedMember = workspaceMemberRepository.save(member);

        // Create Notification
        notificationService.createNotification(
                user,
                "You have been added to workspace: " + workspace.getName(),
                "WORKSPACE_INVITE"
        );

        return new WorkspaceMemberResponse(
                savedMember.getId(),
                savedMember.getUser().getFullName(),
                savedMember.getUser().getEmail(),
                savedMember.getRole().name()
        );
    }

    // Get Members
    public List<WorkspaceMemberResponse> getWorkspaceMembers(Long workspaceId) {

        List<WorkspaceMember> members =
                workspaceMemberRepository.findByWorkspaceId(workspaceId);

        return members.stream()
                .map(member -> new WorkspaceMemberResponse(
                        member.getId(),
                        member.getUser().getFullName(),
                        member.getUser().getEmail(),
                        member.getRole().name()
                ))
                .collect(Collectors.toList());
    }
}