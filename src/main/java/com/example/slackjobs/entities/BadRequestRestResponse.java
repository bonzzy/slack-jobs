package com.example.slackjobs.entities;

import java.util.ArrayList;

public class BadRequestRestResponse<T> extends RestResponse<ArrayList> {
    private String message;

    public BadRequestRestResponse(String message) {
        super(new ArrayList());

        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
