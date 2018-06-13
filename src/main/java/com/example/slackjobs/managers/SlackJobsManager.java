package com.example.slackjobs.managers;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.springframework.beans.factory.annotation.Configurable;

import java.util.Optional;

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

    public Boolean delete(String id) {
        Optional<SlackJob> slackJob = repository.findById(id);

        System.out.println(slackJob.toString());

        if (slackJob.isPresent()) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }
}
