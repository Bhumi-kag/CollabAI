package com.collabai.backend.controller;

import com.collabai.backend.dto.CreateWorkspaceRequest;
import com.collabai.backend.dto.WorkspaceResponse;
import com.collabai.backend.service.WorkspaceService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    // ==========================
    // Create Workspace
    // ==========================

    @PostMapping
    public WorkspaceResponse createWorkspace(
            @Valid @RequestBody CreateWorkspaceRequest request,
            Authentication authentication) {

        return workspaceService.createWorkspace(request, authentication);
    }

    // ==========================
    // Get My Workspaces
    // ==========================

    @GetMapping
    public List<WorkspaceResponse> getMyWorkspaces(
            Authentication authentication) {

        return workspaceService.getMyWorkspaces(authentication);
    }

    // ==========================
    // Update Workspace
    // ==========================

    @PutMapping("/{id}")
    public WorkspaceResponse updateWorkspace(
            @PathVariable Long id,
            @Valid @RequestBody CreateWorkspaceRequest request,
            Authentication authentication) {

        return workspaceService.updateWorkspace(
                id,
                request,
                authentication
        );
    }

    // ==========================
    // Delete Workspace
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteWorkspace(
            @PathVariable Long id,
            Authentication authentication) {

        workspaceService.deleteWorkspace(id, authentication);

        return "Workspace deleted successfully.";
            }
}