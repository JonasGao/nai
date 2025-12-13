package com.jonas.tools.nai;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String nickname;
    private String childName;
    private UserType userType;
    
    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.childName = user.getChildName();
        this.userType = user.getUserType();
    }
}
