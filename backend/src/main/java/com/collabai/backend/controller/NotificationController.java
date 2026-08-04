package com.collabai.backend.controller;

import com.collabai.backend.dto.NotificationResponse;
import com.collabai.backend.service.NotificationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Get All Notifications
    @GetMapping
    public List<NotificationResponse> getNotifications(
            Authentication authentication) {

        return notificationService.getNotifications(authentication);
    }

    // Get Unread Count
    @GetMapping("/unread-count")
    public long getUnreadCount(
            Authentication authentication) {

        return notificationService.getUnreadCount(authentication);
    }

    // Mark One Notification as Read
    @PutMapping("/{id}/read")
    public String markAsRead(
            @PathVariable Long id) {

        notificationService.markAsRead(id);

        return "Notification marked as read.";
    }

    // Mark All Notifications as Read
    @PutMapping("/read-all")
    public String markAllAsRead(
            Authentication authentication) {

        notificationService.markAllAsRead(authentication);

        return "All notifications marked as read.";
    }

    // Delete Notification
    @DeleteMapping("/{id}")
    public String deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return "Notification deleted successfully.";
    }
}