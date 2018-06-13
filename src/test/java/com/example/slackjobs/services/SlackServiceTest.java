package com.example.slackjobs.services;

import com.example.slackjobs.SlackJobsApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SlackJobsApplication.class)
@WebAppConfiguration
public class SlackServiceTest {

    @Test
    public void messageShouldNotBeSentWhenBadWebhookUrlIsGiven() throws Exception {
        SlackService slackService = new SlackService();
        slackService.webhookUrl = "bad_url";
        Boolean isSent = slackService.sendMessage("Some message which must fail");
        assertThat(isSent, is(false));
    }
}
