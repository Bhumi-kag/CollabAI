package com.collabai.backend.dto;

public class DashboardResponse {

    private long totalWorkspaces;
    private long totalTasks;
    private long completedTasks;
    private long inProgressTasks;
    private long todoTasks;
    private long totalMembers;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalWorkspaces,
                             long totalTasks,
                             long completedTasks,
                             long inProgressTasks,
                             long todoTasks,
                             long totalMembers) {
        this.totalWorkspaces = totalWorkspaces;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.inProgressTasks = inProgressTasks;
        this.todoTasks = todoTasks;
        this.totalMembers = totalMembers;
    }

    public long getTotalWorkspaces() {
        return totalWorkspaces;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public long getInProgressTasks() {
        return inProgressTasks;
    }

    public long getTodoTasks() {
        return todoTasks;
    }

    public long getTotalMembers() {
        return totalMembers;
    }
}