package com.example.slackjobs.validators;

import com.example.slackjobs.entities.SlackJob;
import com.example.slackjobs.interfaces.Validator;

import java.sql.Timestamp;
import java.util.Date;

public class SlackJobValidator implements Validator {
    public enum ErrorMessages {

        TIMESTAMP_NOT_VALID("Param timestamp is not a valid timestamp"),
        ENTITY_NOT_FOUND("Not found"),
        MESSAGE_NULL("Param message should not be empty!"),
        TIMESTAMP_NULL("Param timestamp should not be empty!"),
        ID_NULL("Param id should not be empty!"),
        MESSAGE_TO_BIG("Message should be smalle than 500 characters"),
        MESSAGE_TO_SMALL("Param message should have at least 5 characters"),
        EMPTY("");

        private String message;

        ErrorMessages(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    Integer maxMessageSize = 500;
    Integer minMessageSize = 5;
    public ErrorMessages error = ErrorMessages.EMPTY;
    private SlackJob slackJob;

    public SlackJobValidator(SlackJob slackJob) {
        this.slackJob = slackJob;
    }


    @Override
    public Boolean validate() {
        return isTimestampValid() && isMessageValid();
    }

    private Boolean isTimestampValid() {
        Timestamp currentTimestamp = getCurrentTimeUsingDate();

        try {
            Long timestamp = slackJob.getTimestamp();
        } catch (Exception e) {
            error = ErrorMessages.TIMESTAMP_NULL;
            return false;
        }

        System.out.println((Long) currentTimestamp.getTime() + " : " +slackJob.getTimestamp());
        System.out.println(((Long) currentTimestamp.getTime()).compareTo(slackJob.getTimestamp()));
        return ((Long) currentTimestamp.getTime()).compareTo(slackJob.getTimestamp()) < 0;
    }

    private Boolean isMessageValid() {
        if (slackJob.message == null) {
            error = ErrorMessages.MESSAGE_NULL;
            return false;
        }

        if (slackJob.message.length() < minMessageSize) {
            error = ErrorMessages.MESSAGE_TO_SMALL;
            return false;
        }

        if (slackJob.message.length() > maxMessageSize) {
            error = ErrorMessages.MESSAGE_TO_BIG;
            return false;
        }

        return true;
    }

    private Timestamp getCurrentTimeUsingDate() {
        Date date = new Date();
        return new Timestamp(date.getTime());
    }
}
