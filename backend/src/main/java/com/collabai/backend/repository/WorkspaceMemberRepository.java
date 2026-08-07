package com.collabai.backend.repository;

import com.collabai.backend.entity.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {

    // Get all members of a workspace
    List<WorkspaceMember> findByWorkspaceId(Long workspaceId);

    // Check if a user is already a member
    Optional<WorkspaceMember> findByWorkspaceIdAndUserId(Long workspaceId, Long userId);

    // Workspace Statistics
    long countByWorkspaceId(Long workspaceId);
}