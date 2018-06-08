package com.example.slackjobs.repositories;

import com.example.slackjobs.entities.SlackJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "jobs", path = "jobs")
public interface SlackJobsRepository extends JpaRepository<SlackJob, Long> {
}
