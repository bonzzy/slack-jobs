package com.example.slackjobs.components;

import com.example.slackjobs.managers.SlackJobsManager;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class SlackJobScheduler {
    private static final Logger log = LoggerFactory.getLogger(SlackJobScheduler.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    private final SlackJobsRepository repository;

    @Autowired
    public SlackJobScheduler(SlackJobsRepository repository) {
        this.repository = repository;
    }

    @Scheduled(fixedRate = 20000)
    public void reportCurrentTime() {
        SlackJobsManager slackJobsManager = new SlackJobsManager(repository);
        slackJobsManager.sendNowScheduledMessages();
    }

}
