package com.example.slackjobs.validators;

import com.example.slackjobs.entities.SlackJob;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
public class SlackJobValidatorTest {
    private Timestamp validTimestamp = new Timestamp(94997377715801L);
    private Timestamp oldTimestamp = new Timestamp(1529006340013L);

    @Test
    public void returnTrueWhenGivenValidEntity() {
        SlackJob slackJob = new SlackJob();
        String validMessage = "This is a valid message";
        slackJob.message = validMessage;
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        assertThat(slackJobValidator.validate()).isEqualTo(true);
    }

    @Test
    public void returnFalseWhenGivenNullTimestamp() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "This is a good message";

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        assertThat(slackJobValidator.validate()).isEqualTo(false);
    }

    @Test
    public void returnFalseWhenGivenOldTimestamp() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "This is a good message";
        slackJob.setTime(oldTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        assertThat(slackJobValidator.validate()).isEqualTo(false);
    }

    @Test
    public void returnFalseWhenGivenTooBigMessageAndValidTimestamp() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "This is too big message";
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        slackJobValidator.maxMessageSize = 1;
        assertThat(slackJobValidator.validate()).isEqualTo(false);
    }

    @Test
    public void returnFalseWhenGivenTooSmallMessageAndValidTimestamp() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "a";
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        slackJobValidator.minMessageSize = 2;
        assertThat(slackJobValidator.validate()).isEqualTo(false);
    }

    @Test
    public void returnFalseWhenGivenNullMessageAndValidTimestamp() {
        SlackJob slackJob = new SlackJob();
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        assertThat(slackJobValidator.validate()).isEqualTo(false);
    }

    @Test
    public void returnCorrectErrorWhenGivenNullMessage() {
        SlackJob slackJob = new SlackJob();
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        slackJobValidator.validate();

        assertThat(slackJobValidator.error).isEqualTo(SlackJobValidator.ErrorMessages.MESSAGE_NULL);
    }

    @Test
    public void returnCorrectErrorWhenGivenToBigMessage() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "This is too big message";
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        slackJobValidator.maxMessageSize = 1;
        slackJobValidator.validate();

        assertThat(slackJobValidator.error).isEqualTo(SlackJobValidator.ErrorMessages.MESSAGE_TO_BIG);
    }

    @Test
    public void returnCorrectErrorWhenGivenToSmallMessage() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "1";
        slackJob.setTime(validTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        slackJobValidator.maxMessageSize = 10;
        slackJobValidator.validate();

        assertThat(slackJobValidator.error).isEqualTo(SlackJobValidator.ErrorMessages.MESSAGE_TO_SMALL);
    }

    @Test
    public void returnCorrectErrorWhenGivenOldTimestamp() {
        SlackJob slackJob = new SlackJob();
        slackJob.message = "This is a valid message";
        slackJob.setTime(oldTimestamp);

        SlackJobValidator slackJobValidator = new SlackJobValidator(slackJob);
        slackJobValidator.validate();

        assertThat(slackJobValidator.error).isEqualTo(SlackJobValidator.ErrorMessages.TIMESTAMP_OLD);
    }

}
