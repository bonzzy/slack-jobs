package com.example.slackjobs.entities;

import java.util.ArrayList;

public class BadRequestRestResponse<T> extends RestResponse<ArrayList> {

    public enum ErrorMessages {

        MESSAGE_NULL("Param message should not be empty!"),
        TIMESTAMP_NULL("Param timestamp should not be empty!");

        private String message;

        ErrorMessages(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    private String error;

    public BadRequestRestResponse(String error) {
        super(new ArrayList());

        this.error = error;
    }

    public String getError() {
        return error;
    }
}