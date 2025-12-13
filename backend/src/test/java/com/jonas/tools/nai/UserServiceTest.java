package com.jonas.tools.nai;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @Test
    void testFirstUserBecomesAdmin() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("firstuser");
        request.setPassword("password123");
        request.setNickname("First User");
        request.setChildName("Baby");

        // When
        User user = userService.register(request);

        // Then
        assertNotNull(user);
        assertEquals("firstuser", user.getName());
        assertEquals("First User", user.getNickname());
        assertEquals("Baby", user.getChildName());
        assertEquals(UserType.ADMIN, user.getUserType());
        assertNotEquals("password123", user.getPassword()); // Password should be encrypted
    }

    @Test
    void testSecondUserBecomesNormal() {
        // Given - Register first user
        RegisterRequest firstRequest = new RegisterRequest();
        firstRequest.setName("adminuser");
        firstRequest.setPassword("admin123");
        userService.register(firstRequest);

        // When - Register second user
        RegisterRequest secondRequest = new RegisterRequest();
        secondRequest.setName("normaluser");
        secondRequest.setPassword("user123");
        User secondUser = userService.register(secondRequest);

        // Then
        assertEquals(UserType.NORMAL, secondUser.getUserType());
    }

    @Test
    void testDuplicateUserRegistrationThrowsException() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("testuser");
        request.setPassword("password123");
        userService.register(request);

        // When & Then
        RegisterRequest duplicateRequest = new RegisterRequest();
        duplicateRequest.setName("testuser");
        duplicateRequest.setPassword("password456");
        
        assertThrows(IllegalArgumentException.class, () -> {
            userService.register(duplicateRequest);
        });
    }

    @Test
    void testCannotDeleteAdminUser() {
        // Given - Register admin user
        RegisterRequest request = new RegisterRequest();
        request.setName("adminuser");
        request.setPassword("admin123");
        User admin = userService.register(request);

        // When & Then
        assertThrows(IllegalArgumentException.class, () -> {
            userService.deleteUser(admin.getId());
        });
    }

    @Test
    void testCanDeleteNormalUser() {
        // Given - Register two users (first is admin, second is normal)
        RegisterRequest adminRequest = new RegisterRequest();
        adminRequest.setName("admin");
        adminRequest.setPassword("admin123");
        userService.register(adminRequest);

        RegisterRequest normalRequest = new RegisterRequest();
        normalRequest.setName("normaluser");
        normalRequest.setPassword("user123");
        User normalUser = userService.register(normalRequest);

        // When
        userService.deleteUser(normalUser.getId());

        // Then
        assertFalse(userRepo.findById(normalUser.getId()).isPresent());
    }

    @Test
    void testGetUserByName() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("testuser");
        request.setPassword("password123");
        request.setNickname("Test User");
        userService.register(request);

        // When
        User user = userService.getUserByName("testuser");

        // Then
        assertNotNull(user);
        assertEquals("testuser", user.getName());
        assertEquals("Test User", user.getNickname());
    }

    @Test
    void testGetNonExistentUserThrowsException() {
        // When & Then
        assertThrows(IllegalArgumentException.class, () -> {
            userService.getUserByName("nonexistent");
        });
    }
}
