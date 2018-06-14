package com.example.slackjobs.controllers;

import com.example.slackjobs.SlackJobsApplication;
import com.example.slackjobs.entities.BadRequestRestResponse;
import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.managers.SlackJobsManager;
import com.example.slackjobs.repositories.SlackJobsRepository;
import com.example.slackjobs.stubs.SlackJobRequestStub;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SlackJobsApplication.class)
@WebAppConfiguration
public class SlackJobsControllerTest {

    private String defaultSlackJobMessage = "message";
    private String defaultSlackJobChannel = "Channel name";
    private Timestamp defaultSlackJobtimestamp = new Timestamp(14087377715801l);


    private List<SlackJob> slackJobs = new ArrayList<>();
    private MockMvc mockMvc;

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private SlackJobsRepository repository;

    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();

        this.repository.deleteAllInBatch();

        SlackJob slackJob = new SlackJob();
        slackJob.message = defaultSlackJobMessage;
        slackJob.setTime(defaultSlackJobtimestamp);
        slackJob.channel = defaultSlackJobChannel;

        SlackJobsManager slackJobsManager = new SlackJobsManager(repository);
        slackJobsManager.save(slackJob);
    }

    @Test
    public void getAllSlackJobs() throws Exception {
        mockMvc.perform(get("/api/jobs/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.data", notNullValue()))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].message", is(defaultSlackJobMessage)))
                .andExpect(jsonPath("$.data[0].channel", is(defaultSlackJobChannel)))
                .andExpect(jsonPath("$.data[0].timestamp", is(defaultSlackJobtimestamp.getTime())));
    }

    @Test
    public void badRequestWhenMessageIsNotSet() throws Exception {
        Timestamp timestamp = defaultSlackJobtimestamp;

        mockMvc.perform(
                post("/api/jobs/")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("timestamp", timestamp.toString())
        )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data", hasSize(0)))
                .andExpect(jsonPath("$.error", is(BadRequestRestResponse.ErrorMessages.MESSAGE_NULL.getMessage())));
    }

    @Test
    public void badRequestWhenTimestampIsNotSet() throws Exception {
        String message = defaultSlackJobMessage;

        mockMvc.perform(
                post("/api/jobs/")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("message", message)
        )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data", hasSize(0)))
                .andExpect(jsonPath("$.error", is(BadRequestRestResponse.ErrorMessages.TIMESTAMP_NULL.getMessage())));
    }

    @Test
    public void createNewSlackJob() throws Exception {
        SlackJobRequestStub slackJob = new SlackJobRequestStub();
        slackJob.message = "Test message";
        slackJob.setTime(defaultSlackJobtimestamp);

        mockMvc.perform(
                post("/api/jobs/")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("message", slackJob.message)
                        .param("timestamp", slackJob.getTimestamp().toString())
        )
                .andExpect(status().isCreated())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.data", notNullValue()))
                .andExpect(jsonPath("$.data.id", notNullValue()))
                .andExpect(jsonPath("$.data.message", is(slackJob.message)))
                .andExpect(jsonPath("$.data.timestamp", is(slackJob.getTimestamp())));
    }

}
