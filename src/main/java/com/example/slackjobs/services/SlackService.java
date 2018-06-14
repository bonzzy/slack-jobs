package com.example.slackjobs.services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

public class SlackService {
    public static String MESSAGE_FROM_SLACK_IF_SENT = "ok";

    public String webhookUrl = "https://hooks.slack.com/services/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";

    public Boolean sendMessage(String message) {
        try {
            return this.createRequest(message).equals(SlackService.MESSAGE_FROM_SLACK_IF_SENT);
        } catch (Exception e) {
            return false;
        }
    }

    private String createRequest(String message) throws Exception {
        HttpResponse<String> response = Unirest.post(this.webhookUrl)
                .header("Content-type", "application/json")
                .header("Cache-Control", "no-cache")
                .body("{\"text\":\""+message+"\"}")
                .asString();

        return response.getBody();
    }
}
