package com.collabai.backend.dto;

public class WorkspaceResponse {

    private Long id;
    private String name;
    private String description;
    private String ownerName;

    private long memberCount;
    private long taskCount;
    private long completedTaskCount;
    private int progress;

    public WorkspaceResponse() {
    }

    public WorkspaceResponse(
            Long id,
            String name,
            String description,
            String ownerName,
            long memberCount,
            long taskCount,
            long completedTaskCount,
            int progress) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.ownerName = ownerName;
        this.memberCount = memberCount;
        this.taskCount = taskCount;
        this.completedTaskCount = completedTaskCount;
        this.progress = progress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public long getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(long memberCount) {
        this.memberCount = memberCount;
    }

    public long getTaskCount() {
        return taskCount;
    }

    public void setTaskCount(long taskCount) {
        this.taskCount = taskCount;
    }

    public long getCompletedTaskCount() {
        return completedTaskCount;
    }

    public void setCompletedTaskCount(long completedTaskCount) {
        this.completedTaskCount = completedTaskCount;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }
}