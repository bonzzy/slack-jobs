package com.example.slackjobs.repositories;

import com.example.slackjobs.entities.SlackJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlackJobsRepository extends JpaRepository<SlackJob, Long> {

}
