package com.collabai.backend.repository;

import com.collabai.backend.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    List<Workspace> findByCreatedById(Long userId);

}

