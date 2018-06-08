package com.example.slackjobs.entityManagers;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class SlackJobsManager {

    @Autowired
    private SlackJobsRepository repository;

    public SlackJob save(SlackJob entity) {
        entity.setJobStatus(SlackJob.JobStatus.PENDING);

        SlackJob savedEntity = repository.save(entity);

        return savedEntity;
    }
}
