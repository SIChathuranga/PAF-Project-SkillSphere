package com.backend.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.UserStatus;
import com.backend.backend.Service.UserStatusService;

@RestController
@RequestMapping("/api/v1/user-status")
public class UserStatusController {

    @Autowired
    private UserStatusService userStatusService;

    // Get all user statuses
    @GetMapping("/all")
    public ResponseEntity<List<UserStatus>> getAllUserStatuses() {
        return ResponseEntity.ok(userStatusService.getAllUserStatuses());
    }

    // Get a specific user status by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserStatusById(@PathVariable String id) {
        Optional<UserStatus> status = userStatusService.getUserStatusById(id);
        if (status.isPresent()) {
            return ResponseEntity.ok(status.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Get statuses by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserStatus>> getStatusesByUser(@PathVariable String userId) {
        return ResponseEntity.ok(userStatusService.getStatusesByUser(userId));
    }

    // Create a new user status
    @PostMapping("/add")
    public ResponseEntity<UserStatus> createUserStatus(@RequestBody UserStatus userStatus) {
        return ResponseEntity.ok(userStatusService.createUserStatus(userStatus));
    }

    // Update an existing user status by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUserStatus(@PathVariable String id, @RequestBody UserStatus userStatus) {
        try {
            UserStatus updated = userStatusService.updateUserStatus(id, userStatus);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a user status by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserStatus(@PathVariable String id) {
        userStatusService.deleteUserStatus(id);
        return ResponseEntity.ok().build();
    }
}
