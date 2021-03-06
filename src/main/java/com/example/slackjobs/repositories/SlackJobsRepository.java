package com.example.slackjobs.repositories;

import com.example.slackjobs.entities.SlackJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface SlackJobsRepository extends JpaRepository<SlackJob, String>, SlackJobsRepositoryCustom {

    @Modifying
    @Transactional
    void deleteById(String id);
}
