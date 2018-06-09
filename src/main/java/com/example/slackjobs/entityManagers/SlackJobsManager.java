package com.example.slackjobs.entityManagers;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.springframework.beans.factory.annotation.Configurable;

@Configurable
public class SlackJobsManager {

    private SlackJobsRepository repository;

    public SlackJobsManager(SlackJobsRepository repository) {
        this.repository = repository;
    }

    public SlackJob save(SlackJob entity) {
        entity.setJobStatus(SlackJob.JobStatus.PENDING);

        System.out.println(repository);
        SlackJob savedEntity = repository.save(entity);

        return savedEntity;
    }
}
