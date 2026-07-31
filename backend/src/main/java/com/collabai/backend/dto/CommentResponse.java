package com.collabai.backend.dto;

public class CommentResponse {

    private Long id;
    private String content;
    private String userName;

    public CommentResponse() {
    }

    public CommentResponse(Long id, String content, String userName) {
        this.id = id;
        this.content = content;
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getUserName() {
        return userName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}