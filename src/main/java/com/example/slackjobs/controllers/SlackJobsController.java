package com.example.slackjobs.controllers;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.entities.RestResponse;
import com.example.slackjobs.entityManagers.SlackJobsManager;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class SlackJobsController {

    @Autowired
    private SlackJobsRepository repository;

    @GetMapping("/")
    public ResponseEntity<RestResponse<Collection<SlackJob>>> getAllJobs() {
        return ResponseEntity.status(200).body(new RestResponse<>(repository.findAll()));
    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity<RestResponse<SlackJob>> createJob(@RequestParam Map<String, String> body) {
        SlackJobsManager slackJobsManager = new SlackJobsManager(repository);
        SlackJob slackJob = new SlackJob();


        slackJob.message = body.get("message");
        slackJob.timestamp = body.get("timestamp");
        slackJob.channel = "";

        SlackJob savedEntity = slackJobsManager.save(slackJob);
        return ResponseEntity.status(201).body(new RestResponse<>(savedEntity));
    }

}
