package com.collabai.backend.service;

import com.collabai.backend.entity.User;
import com.collabai.backend.entity.WorkspaceMember;
import com.collabai.backend.enums.WorkspaceRole;
import com.collabai.backend.exception.ResourceNotFoundException;
import com.collabai.backend.repository.UserRepository;
import com.collabai.backend.repository.WorkspaceMemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    private final UserRepository userRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;

    public PermissionService(UserRepository userRepository,
                             WorkspaceMemberRepository workspaceMemberRepository) {

        this.userRepository = userRepository;
        this.workspaceMemberRepository = workspaceMemberRepository;
    }

    public void checkOwnerOrAdmin(Long workspaceId,
                                  Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        WorkspaceMember member = workspaceMemberRepository
                .findByWorkspaceIdAndUserId(workspaceId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("You are not a workspace member"));

        if (member.getRole() != WorkspaceRole.OWNER &&
            member.getRole() != WorkspaceRole.ADMIN) {

            throw new RuntimeException(
                    "Access denied. Only OWNER or ADMIN can perform this action."
            );
        }
    }
}