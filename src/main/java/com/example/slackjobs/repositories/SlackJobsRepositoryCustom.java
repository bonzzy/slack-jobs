package com.example.slackjobs.repositories;

import com.example.slackjobs.entities.SlackJob;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.Collection;

public interface SlackJobsRepositoryCustom {
    @Query("select job from SlackJob job where job.time < ?1 AND job.jobStatus = ?2")
    public Collection<SlackJob> findUntilWith(Timestamp endTime, SlackJob.JobStatus status);
}
