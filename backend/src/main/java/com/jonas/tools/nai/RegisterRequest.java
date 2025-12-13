package com.jonas.tools.nai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String name;
    
    @NotBlank
    private String password;
    
    private String nickname;
    
    private String childName;
}
