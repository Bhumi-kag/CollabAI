package com.collabai.backend.dto;

public class DashboardResponse {

    private long totalWorkspaces;
    private long totalTasks;
    private long todoTasks;
    private long inProgressTasks;
    private long completedTasks;
    private long totalMembers;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalWorkspaces,
                             long totalTasks,
                             long todoTasks,
                             long inProgressTasks,
                             long completedTasks,
                             long totalMembers) {

        this.totalWorkspaces = totalWorkspaces;
        this.totalTasks = totalTasks;
        this.todoTasks = todoTasks;
        this.inProgressTasks = inProgressTasks;
        this.completedTasks = completedTasks;
        this.totalMembers = totalMembers;
    }

    public long getTotalWorkspaces() {
        return totalWorkspaces;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getTodoTasks() {
        return todoTasks;
    }

    public long getInProgressTasks() {
        return inProgressTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public long getTotalMembers() {
        return totalMembers;
    }
}