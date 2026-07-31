package com.collabai.backend.controller;

import com.collabai.backend.dto.InviteMemberRequest;
import com.collabai.backend.dto.WorkspaceMemberResponse;
import com.collabai.backend.service.WorkspaceMemberService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class WorkspaceMemberController {

    private final WorkspaceMemberService workspaceMemberService;

    public WorkspaceMemberController(
            WorkspaceMemberService workspaceMemberService) {

        this.workspaceMemberService = workspaceMemberService;
    }

    @PostMapping
    public WorkspaceMemberResponse inviteMember(
            @Valid @RequestBody InviteMemberRequest request) {

        return workspaceMemberService.inviteMember(request);
    }

    @GetMapping("/{workspaceId}")
    public List<WorkspaceMemberResponse> getWorkspaceMembers(
            @PathVariable Long workspaceId) {

        return workspaceMemberService.getWorkspaceMembers(workspaceId);
    }
}