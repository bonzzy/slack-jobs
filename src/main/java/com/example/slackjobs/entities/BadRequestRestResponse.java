package com.example.slackjobs.entities;

import java.util.ArrayList;

public class BadRequestRestResponse<T> extends RestResponse<ArrayList> {

    public enum ErrorMessages {

        TIMESTAMP_NOT_VALID("Param timestamp is not a valid timestamp"),
        ENTITY_NOT_FOUND("Not found"),
        MESSAGE_NULL("Param message should not be empty!"),
        TIMESTAMP_NULL("Param timestamp should not be empty!"),
        ID_NULL("Param id should not be empty!");

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
