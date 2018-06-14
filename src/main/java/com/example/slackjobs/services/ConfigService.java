package com.example.slackjobs.services;

public class ConfigService {

    private static ConfigService INSTANCE = new ConfigService();

    private String slackChannel = "";
    private String slackWebhook = "";

    private ConfigService() {

    }

    public static ConfigService getInstance() {
        return INSTANCE;
    }

    public String getSlackChannel() {
        return slackChannel;
    }

    public void setSlackChannel(String slackChannel) {
        this.slackChannel = slackChannel;
    }

    public String getSlackWebhook() {
        return slackWebhook;
    }

    public void setSlackWebhook(String slackWebhook) {
        this.slackWebhook = slackWebhook;
    }
}