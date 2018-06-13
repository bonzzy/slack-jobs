package com.example.slackjobs.stubs;

import java.sql.Timestamp;

public class SlackJobRequestStub {
    public String message;
    private Timestamp time;
    private String timestamp;

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Long getTimestamp() {
        return time.getTime();
    }
}
