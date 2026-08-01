package com.collabai.backend.controller;

import com.collabai.backend.dto.ActivityResponse;
import com.collabai.backend.service.ActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/{workspaceId}")
    public List<ActivityResponse> getActivities(
            @PathVariable Long workspaceId) {

        return activityService.getActivities(workspaceId);
    }
}