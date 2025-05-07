package com.backend.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "topics")
public class Topic {

    @Id
    private String id;
    private String topicOne;
    private String topicOneDescription;
    private String topicTwo;
    private String topicTwoDescription;
    private String topicThree;
    private String topicThreeDescription;
    private String topicFour;    // Corrected from "Topicfore"
    private String topicFourDescription;
    private String topicFive;
    private String topicFiveDescription;   // Corrected from repeat of "Topicthree description"

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
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Topic{" +
                "id='" + id + '\'' +
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
                '}';
    }
}