package com.example.slackjobs.entities;

public class RestResponse<T> {
    private T result;

    public RestResponse(T result) {
        this.result = result;
    }

    public T getResult() {
        return result;
    }
}
