package com.backend.backend.Controller;

import com.backend.backend.Model.UserStatus; // Import the UserStatus model class
import com.backend.backend.Service.UserStatusService; // Import the UserStatus service class
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Allow requests from any frontend origin (for example, React app running on a different port)
@CrossOrigin(origins = "*") 
@RestController // Marks this class as a REST controller, returning JSON responses
@RequestMapping("/api/userstatus") // Base URL for all endpoints in this controller
public class UserStatusController {

    @Autowired
    private UserStatusService userStatusService; // Inject the service to handle business logic

    // Endpoint to get all user statuses (GET request)
    @GetMapping
    public List<UserStatus> getAllUserStatuses() {
        return userStatusService.getAllUserStatuses(); // Fetch all user status records
    }

    // Endpoint to get a specific user status by ID (GET request)
    @GetMapping("/{id}")
    public Optional<UserStatus> getUserStatusById(@PathVariable String id) {
        return userStatusService.getUserStatusById(id); // Fetch a specific user status by its ID
    }

    // Endpoint to create a new user status (POST request)
    @PostMapping
    public UserStatus createUserStatus(@RequestBody UserStatus userStatus) {
        return userStatusService.createUserStatus(userStatus); // Create and save a new user status
    }

    // Endpoint to update an existing user status by ID (PUT request)
    @PutMapping("/{id}")
    public UserStatus updateUserStatus(@PathVariable String id, @RequestBody UserStatus userStatus) {
        return userStatusService.updateUserStatus(id, userStatus); // Update fields of an existing user status
    }

    // Endpoint to delete a user status by ID (DELETE request)
    @DeleteMapping("/{id}")
    public void deleteUserStatus(@PathVariable String id) {
        userStatusService.deleteUserStatus(id); // Delete a user status by its ID
    }
}
