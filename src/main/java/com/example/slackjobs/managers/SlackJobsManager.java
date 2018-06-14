package com.example.slackjobs.managers;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.repositories.SlackJobsRepository;
import com.example.slackjobs.services.ConfigService;
import com.example.slackjobs.services.SlackService;
import org.springframework.beans.factory.annotation.Configurable;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@Configurable
public class SlackJobsManager {

    private SlackJobsRepository repository;

    public SlackJobsManager(SlackJobsRepository repository) {
        this.repository = repository;
    }

    public SlackJob save(SlackJob entity) {
        entity.setJobStatus(SlackJob.JobStatus.PENDING);
        entity.channel = ConfigService.getInstance().getSlackChannel();

        return repository.save(entity);
    }

    public void setStatusAsFinished(SlackJob entity) {
        entity.setJobStatus(SlackJob.JobStatus.FINISHED);
        repository.save(entity);

        return;
    }

    public Boolean delete(String id) {
        Optional<SlackJob> slackJob = repository.findById(id);

        if (slackJob.isPresent()) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    public Collection<SlackJob> findUntilWithStatus(Timestamp timestamp, SlackJob.JobStatus status) {
        return repository.findUntilWith(timestamp, status);
    }

    public void sendNowScheduledMessages() {
        Timestamp timestamp = new Timestamp(new Date().getTime());

        Collection<SlackJob> preparedJobs = this.findUntilWithStatus(timestamp, SlackJob.JobStatus.PENDING);
        SlackService slackService = new SlackService();

        preparedJobs.forEach((slackJob) -> {
            if (!slackService.sendMessage(slackJob.message)) {
                return;
            }

            slackJob.setJobStatus(SlackJob.JobStatus.FINISHED);
            this.setStatusAsFinished(slackJob);
        });
    }
}
