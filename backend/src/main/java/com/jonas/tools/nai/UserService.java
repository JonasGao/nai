package com.jonas.tools.nai;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class UserService {
    
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Transactional
    public User register(RegisterRequest request) {
        // Check if user already exists
        if (userRepo.findByName(request.getName()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname());
        user.setChildName(request.getChildName());
        
        // First user becomes admin
        if (userRepo.count() == 0) {
            user.setUserType(UserType.ADMIN);
        } else {
            user.setUserType(UserType.NORMAL);
        }
        
        user.setCreatorAndModifier(request.getName());
        user.setCreatedAndModified(new Date());
        
        return userRepo.save(user);
    }
    
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    
    public User getUserByName(String name) {
        return userRepo.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
    
    @Transactional
    public void deleteUser(Long id) {
        // Prevent deletion of admin users
        User user = userRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (user.getUserType() == UserType.ADMIN) {
            throw new IllegalArgumentException("Cannot delete admin users");
        }
        
        userRepo.deleteById(id);
    }
}
