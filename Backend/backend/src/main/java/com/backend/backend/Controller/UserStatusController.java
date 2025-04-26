package com.backend.backend.Controller;

import com.backend.backend.Model.UserStatus; // Ensure the UserStatus class exists in this package or update the package path
import com.backend.backend.Service.UserStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")  // Allow React frontend to connect
@RestController
@RequestMapping("/api/userstatus")
public class UserStatusController {

    @Autowired
    private UserStatusService userStatusService;

    @GetMapping
    public List<UserStatus> getAllUserStatuses() {
        return userStatusService.getAllUserStatuses();
    }

    @GetMapping("/{id}")
    public Optional<UserStatus> getUserStatusById(@PathVariable String id) {
        return userStatusService.getUserStatusById(id);
    }

    @PostMapping
    public UserStatus createUserStatus(@RequestBody UserStatus userStatus) {
        return userStatusService.createUserStatus(userStatus);
    }

    @PutMapping("/{id}")
    public UserStatus updateUserStatus(@PathVariable String id, @RequestBody UserStatus userStatus) {
        return userStatusService.updateUserStatus(id, userStatus);
    }

    @DeleteMapping("/{id}")
    public void deleteUserStatus(@PathVariable String id) {
        userStatusService.deleteUserStatus(id);
    }
}
