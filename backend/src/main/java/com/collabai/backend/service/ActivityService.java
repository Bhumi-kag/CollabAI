package com.collabai.backend.service;

import com.collabai.backend.dto.ActivityResponse;
import com.collabai.backend.entity.Activity;
import com.collabai.backend.entity.Workspace;
import com.collabai.backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public void logActivity(Workspace workspace,
                            String action,
                            String performedBy) {

        Activity activity = new Activity();

        activity.setWorkspace(workspace);
        activity.setAction(action);
        activity.setPerformedBy(performedBy);
        activity.setCreatedAt(LocalDateTime.now());

        activityRepository.save(activity);
    }

    public List<ActivityResponse> getActivities(Long workspaceId) {

        return activityRepository
                .findByWorkspaceIdOrderByCreatedAtDesc(workspaceId)
                .stream()
                .map(activity -> new ActivityResponse(
                        activity.getId(),
                        activity.getAction(),
                        activity.getPerformedBy(),
                        activity.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}