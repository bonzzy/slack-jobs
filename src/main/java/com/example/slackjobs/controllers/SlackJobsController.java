package com.example.slackjobs.controllers;

import com.example.slackjobs.entities.BadRequestRestResponse;
import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.entities.RestResponse;
import com.example.slackjobs.entityManagers.SlackJobsManager;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.SpringServletContainerInitializer;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class SlackJobsController {

    public enum BadRequestMessages {

        MESSAGE_NULL("Param message should not be empty!"),
        TIMESTAMP_NULL("Param timestamp should not be empty!");

        private String message;

        BadRequestMessages(String message) {
            this.message = message;
        }

        public String message() {
            return message;
        }
    }

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

        if (body.get("message") == null) {
            return ResponseEntity.badRequest().body(new BadRequestRestResponse(BadRequestMessages.MESSAGE_NULL.message));
        }

        if (body.get("timestamp") == null) {
            return ResponseEntity.badRequest().body(new BadRequestRestResponse(BadRequestMessages.TIMESTAMP_NULL.message));
        }

        slackJob.message = body.get("message");
        slackJob.timestamp = body.get("timestamp");
        slackJob.channel = "";

        SlackJob savedEntity = slackJobsManager.save(slackJob);
        return ResponseEntity.status(201).body(new RestResponse<>(savedEntity));
    }

}
