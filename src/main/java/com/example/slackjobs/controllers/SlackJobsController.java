package com.example.slackjobs.controllers;

import com.example.slackjobs.entities.BadRequestRestResponse;
import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.entities.RestResponse;
import com.example.slackjobs.managers.SlackJobsManager;
import com.example.slackjobs.repositories.SlackJobsRepository;
import com.example.slackjobs.utils.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class SlackJobsController {

    @Autowired
    private SlackJobsRepository repository;

    @GetMapping("/")
    public ResponseEntity<RestResponse<Collection<SlackJob>>> getAllJobs() {
        return ResponseEntity
                .status(200)
                .body(new RestResponse<>(repository.findAll()));
    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity createJob(@RequestParam Map<String, String> body) {
        SlackJobsManager slackJobsManager = new SlackJobsManager(repository);
        SlackJob slackJob = new SlackJob();

        if (body.get("message") == null) {
            return ResponseEntity.badRequest().body(new BadRequestRestResponse(BadRequestRestResponse.ErrorMessages.MESSAGE_NULL.getMessage()));
        }

        if (body.get("timestamp") == null) {
            return ResponseEntity.badRequest().body(new BadRequestRestResponse(BadRequestRestResponse.ErrorMessages.TIMESTAMP_NULL.getMessage()));
        }

        try {
            TimestampConverter timestampConverter = new TimestampConverter();
            Timestamp timestamp = timestampConverter.convertString(body.get("timestamp"));

            slackJob.message = body.get("message");
            slackJob.setTime(timestamp);

            SlackJob savedEntity = slackJobsManager.save(slackJob);

            return ResponseEntity
                    .status(201)
                    .body(new RestResponse<>(savedEntity));
        } catch(Exception e) { //this generic but you can control another types of exception
            return ResponseEntity.badRequest().body(new BadRequestRestResponse(BadRequestRestResponse.ErrorMessages.TIMESTAMP_NOT_VALID.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteJob(@PathVariable String id) {
        SlackJobsManager slackJobsManager = new SlackJobsManager(repository);

        if (id == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new BadRequestRestResponse(BadRequestRestResponse.ErrorMessages.ID_NULL.getMessage()));
        }

        Boolean isDeleted = slackJobsManager.delete(id);

        if (!isDeleted) {
            return ResponseEntity
                    .status(404)
                    .body(new RestResponse<>(new BadRequestRestResponse(BadRequestRestResponse.ErrorMessages.ENTITY_NOT_FOUND.getMessage())));
        }

        return ResponseEntity
                .status(200)
                .body(new RestResponse<>(Collections.emptyList()));
    }
}
