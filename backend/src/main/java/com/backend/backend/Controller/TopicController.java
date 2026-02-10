package com.backend.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.Topic;
import com.backend.backend.Service.TopicService;

@RestController
@RequestMapping("/api/v1/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    // Create - POST /api/v1/topics/add
    @PostMapping("/add")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        Topic newTopic = topicService.createTopic(topic);
        return new ResponseEntity<>(newTopic, HttpStatus.CREATED);
    }

    // Read (all) - GET /api/v1/topics/all
    @GetMapping("/all")
    public ResponseEntity<List<Topic>> getAllTopics() {
        List<Topic> topics = topicService.getAllTopics();
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }

    // Read (by id) - GET /api/v1/topics/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable String id) {
        Optional<Topic> topic = topicService.getTopicById(id);
        return topic.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get topics by user ID - GET /api/v1/topics/user/{userId}
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Topic>> getTopicsByUser(@PathVariable String userId) {
        List<Topic> topics = topicService.getTopicsByUser(userId);
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }

    // Update - PUT /api/v1/topics/update/{id}
    @PutMapping("/update/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable String id, @RequestBody Topic topic) {
        Topic updatedTopic = topicService.updateTopic(id, topic);
        if (updatedTopic != null) {
            return new ResponseEntity<>(updatedTopic, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update progress - PATCH /api/v1/topics/{id}/progress
    @PatchMapping("/{id}/progress")
    public ResponseEntity<Topic> updateProgress(@PathVariable String id, @RequestBody java.util.Map<String, Integer> progressMap) {
        Integer progress = progressMap.get("progress");
        if (progress != null) {
            Topic updatedTopic = topicService.updateProgress(id, progress);
            if (updatedTopic != null) {
                return new ResponseEntity<>(updatedTopic, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete - DELETE /api/v1/topics/delete/{id}
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable String id) {
        topicService.deleteTopic(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}