package com.backend.backend.Model;

import java.util.Map;
import java.util.HashMap;
import java.util.Date;

public class Topic {

    private String id;
    private String userId;  // Firebase User ID
    private Integer progress = 0;  // Progress percentage (0-100)
    private String topicOne;
    private String topicOneDescription;
    private String topicTwo;
    private String topicTwoDescription;
    private String topicThree;
    private String topicThreeDescription;
    private String topicFour;
    private String topicFourDescription;
    private String topicFive;
    private String topicFiveDescription;
    private Date createdAt;

    // Default constructor
    public Topic() {
    }

    // Parameterized constructor
    public Topic(String topicOne, String topicOneDescription, String topicTwo, String topicTwoDescription,
                 String topicThree, String topicThreeDescription, String topicFour, String topicFourDescription,
                 String topicFive, String topicFiveDescription) {
        this.topicOne = topicOne;
        this.topicOneDescription = topicOneDescription;
        this.topicTwo = topicTwo;
        this.topicTwoDescription = topicTwoDescription;
        this.topicThree = topicThree;
        this.topicThreeDescription = topicThreeDescription;
        this.topicFour = topicFour;
        this.topicFourDescription = topicFourDescription;
        this.topicFive = topicFive;
        this.topicFiveDescription = topicFiveDescription;
        this.createdAt = new Date();
    }

    // Convert to Firestore map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("progress", progress != null ? progress : 0);
        map.put("topicOne", topicOne);
        map.put("topicOneDescription", topicOneDescription);
        map.put("topicTwo", topicTwo);
        map.put("topicTwoDescription", topicTwoDescription);
        map.put("topicThree", topicThree);
        map.put("topicThreeDescription", topicThreeDescription);
        map.put("topicFour", topicFour);
        map.put("topicFourDescription", topicFourDescription);
        map.put("topicFive", topicFive);
        map.put("topicFiveDescription", topicFiveDescription);
        map.put("createdAt", createdAt != null ? createdAt.getTime() : new Date().getTime());
        return map;
    }

    // Create from Firestore document
    public static Topic fromMap(String id, Map<String, Object> map) {
        Topic topic = new Topic();
        topic.setId(id);
        topic.setUserId((String) map.get("userId"));
        Object progressObj = map.get("progress");
        if (progressObj instanceof Long) {
            topic.setProgress(((Long) progressObj).intValue());
        } else if (progressObj instanceof Integer) {
            topic.setProgress((Integer) progressObj);
        } else {
            topic.setProgress(0);
        }
        topic.setTopicOne((String) map.get("topicOne"));
        topic.setTopicOneDescription((String) map.get("topicOneDescription"));
        topic.setTopicTwo((String) map.get("topicTwo"));
        topic.setTopicTwoDescription((String) map.get("topicTwoDescription"));
        topic.setTopicThree((String) map.get("topicThree"));
        topic.setTopicThreeDescription((String) map.get("topicThreeDescription"));
        topic.setTopicFour((String) map.get("topicFour"));
        topic.setTopicFourDescription((String) map.get("topicFourDescription"));
        topic.setTopicFive((String) map.get("topicFive"));
        topic.setTopicFiveDescription((String) map.get("topicFiveDescription"));
        Object createdAtObj = map.get("createdAt");
        if (createdAtObj instanceof Long) {
            topic.setCreatedAt(new Date((Long) createdAtObj));
        } else if (createdAtObj instanceof com.google.cloud.Timestamp) {
            topic.setCreatedAt(((com.google.cloud.Timestamp) createdAtObj).toDate());
        } else {
            topic.setCreatedAt(new Date());
        }
        return topic;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public String getTopicOne() {
        return topicOne;
    }

    public void setTopicOne(String topicOne) {
        this.topicOne = topicOne;
    }

    public String getTopicOneDescription() {
        return topicOneDescription;
    }

    public void setTopicOneDescription(String topicOneDescription) {
        this.topicOneDescription = topicOneDescription;
    }

    public String getTopicTwo() {
        return topicTwo;
    }

    public void setTopicTwo(String topicTwo) {
        this.topicTwo = topicTwo;
    }

    public String getTopicTwoDescription() {
        return topicTwoDescription;
    }

    public void setTopicTwoDescription(String topicTwoDescription) {
        this.topicTwoDescription = topicTwoDescription;
    }

    public String getTopicThree() {
        return topicThree;
    }

    public void setTopicThree(String topicThree) {
        this.topicThree = topicThree;
    }

    public String getTopicThreeDescription() {
        return topicThreeDescription;
    }

    public void setTopicThreeDescription(String topicThreeDescription) {
        this.topicThreeDescription = topicThreeDescription;
    }

    public String getTopicFour() {
        return topicFour;
    }

    public void setTopicFour(String topicFour) {
        this.topicFour = topicFour;
    }

    public String getTopicFourDescription() {
        return topicFourDescription;
    }

    public void setTopicFourDescription(String topicFourDescription) {
        this.topicFourDescription = topicFourDescription;
    }

    public String getTopicFive() {
        return topicFive;
    }

    public void setTopicFive(String topicFive) {
        this.topicFive = topicFive;
    }

    public String getTopicFiveDescription() {
        return topicFiveDescription;
    }

    public void setTopicFiveDescription(String topicFiveDescription) {
        this.topicFiveDescription = topicFiveDescription;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", progress=" + progress +
                ", topicOne='" + topicOne + '\'' +
                ", topicOneDescription='" + topicOneDescription + '\'' +
                ", topicTwo='" + topicTwo + '\'' +
                ", topicTwoDescription='" + topicTwoDescription + '\'' +
                ", topicThree='" + topicThree + '\'' +
                ", topicThreeDescription='" + topicThreeDescription + '\'' +
                ", topicFour='" + topicFour + '\'' +
                ", topicFourDescription='" + topicFourDescription + '\'' +
                ", topicFive='" + topicFive + '\'' +
                ", topicFiveDescription='" + topicFiveDescription + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}