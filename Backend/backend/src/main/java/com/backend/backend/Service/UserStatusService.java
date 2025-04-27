package com.backend.backend.Service;

import com.backend.backend.Model.UserStatus;
import com.backend.backend.Repository.UserStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Marks this class as a Spring service component (business logic layer)
public class UserStatusService {

    @Autowired
    private UserStatusRepository userStatusRepository; // Inject the repository to access database operations

    // Fetch and return all user statuses
    public List<UserStatus> getAllUserStatuses() {
        return userStatusRepository.findAll();
    }

    // Fetch a specific user status by its ID
    public Optional<UserStatus> getUserStatusById(String id) {
        return userStatusRepository.findById(id);
    }

    // Create a new user status entry
    public UserStatus createUserStatus(UserStatus userStatus) {
        return userStatusRepository.save(userStatus); // Save the new user status to the database
    }

    // Update an existing user status by ID
    public UserStatus updateUserStatus(String id, UserStatus updatedStatus) {
        Optional<UserStatus> existingStatusOptional = userStatusRepository.findById(id);

        if (existingStatusOptional.isPresent()) {
            UserStatus existingStatus = existingStatusOptional.get();
            // Update the existing fields with new values
            existingStatus.setUsername(updatedStatus.getUsername());
            existingStatus.setDescription(updatedStatus.getDescription());
            existingStatus.setImageUrl(updatedStatus.getImageUrl());
            return userStatusRepository.save(existingStatus); // Save the updated user status
        } else {
            // If the status with given ID is not found, throw an exception
            throw new RuntimeException("User status not found with id: " + id);
        }
    }

    // Delete a user status entry by ID
    public void deleteUserStatus(String id) {
        userStatusRepository.deleteById(id);
    }
}
