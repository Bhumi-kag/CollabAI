package com.collabai.backend.dto;

public class WorkspaceResponse {

    private Long id;
    private String name;
    private String description;
    private String ownerName;

    public WorkspaceResponse() {
    }

    public WorkspaceResponse(Long id, String name, String description, String ownerName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ownerName = ownerName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
}