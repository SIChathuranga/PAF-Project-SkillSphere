package com.backend.backend.Service;

import com.backend.backend.Model.UserStatus;
import com.backend.backend.Repository.UserStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserStatusService {

    @Autowired
    private UserStatusRepository userStatusRepository;

    public List<UserStatus> getAllUserStatuses() {
        return userStatusRepository.findAll();
    }

    public Optional<UserStatus> getUserStatusById(String id) {
        return userStatusRepository.findById(id);
    }

    public UserStatus createUserStatus(UserStatus userStatus) {
        return userStatusRepository.save(userStatus);
    }

    public UserStatus updateUserStatus(String id, UserStatus updatedStatus) {
        Optional<UserStatus> existingStatusOptional = userStatusRepository.findById(id);

        if (existingStatusOptional.isPresent()) {
            UserStatus existingStatus = existingStatusOptional.get();
            existingStatus.setUsername(updatedStatus.getUsername());
            existingStatus.setDescription(updatedStatus.getDescription());
            existingStatus.setImageUrl(updatedStatus.getImageUrl());
            return userStatusRepository.save(existingStatus);
        } else {
            throw new RuntimeException("User status not found with id: " + id);
        }
    }

    public void deleteUserStatus(String id) {
        userStatusRepository.deleteById(id);
    }
}
