package com.backend.backend.Service;

import com.backend.backend.Model.Topic;
import com.backend.backend.Repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    // Create
    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    // Read (all)
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // Read (by id)
    public Optional<Topic> getTopicById(String id) {
        return topicRepository.findById(id);
    }

    // Update
    public Topic updateTopic(String id, Topic topicDetails) {
        Optional<Topic> topic = topicRepository.findById(id);
        if (topic.isPresent()) {
            Topic existingTopic = topic.get();
            existingTopic.setTopicOne(topicDetails.getTopicOne());
            existingTopic.setTopicOneDescription(topicDetails.getTopicOneDescription());
            existingTopic.setTopicTwo(topicDetails.getTopicTwo());
            existingTopic.setTopicTwoDescription(topicDetails.getTopicTwoDescription());
            existingTopic.setTopicThree(topicDetails.getTopicThree());
            existingTopic.setTopicThreeDescription(topicDetails.getTopicThreeDescription());
            existingTopic.setTopicFour(topicDetails.getTopicFour());
            existingTopic.setTopicFourDescription(topicDetails.getTopicFourDescription());
            existingTopic.setTopicFive(topicDetails.getTopicFive());
            existingTopic.setTopicFiveDescription(topicDetails.getTopicFiveDescription());
            return topicRepository.save(existingTopic);
        }
        return null;
    }

    // Delete
    public void deleteTopic(String id) {
        topicRepository.deleteById(id);
    }
}
