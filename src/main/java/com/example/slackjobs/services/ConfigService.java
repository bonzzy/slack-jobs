package com.example.slackjobs.services;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
public class ConfigService {

    private static AtomicReference<ConfigService> INSTANCE = new AtomicReference<ConfigService>();

    private String slackChannel;
    private String slackWebhook;

    public ConfigService() {
        final ConfigService previous = INSTANCE.getAndSet(this);
        if(previous != null)
            throw new IllegalStateException("Second singleton " + this + " created after " + previous);
    }

    public static ConfigService getInstance() {
        return INSTANCE.get();
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