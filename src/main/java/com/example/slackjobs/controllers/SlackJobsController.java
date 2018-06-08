package com.example.slackjobs.controllers;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.entityManagers.SlackJobsManager;
import com.example.slackjobs.repositories.SlackJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class SlackJobsController {

    @Autowired
    private SlackJobsRepository repository;

    @GetMapping("/")
    public Collection<SlackJob> getAllJobs() {
        return repository.findAll();
    }

    @PostMapping("/")
    @ResponseBody
    public String createJob(@RequestParam Map<String, String> body) {
        SlackJobsManager slackJobsManager = new SlackJobsManager();
        SlackJob slackJob = new SlackJob();


        slackJob.message = body.get("message");
        slackJob.timestamp = body.get("timestamp");
        slackJob.channel = "";

        slackJobsManager.save(slackJob);
        return "Job is created!";
    }

}
