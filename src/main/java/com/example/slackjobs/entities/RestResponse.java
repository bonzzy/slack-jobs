package com.example.slackjobs.entities;

public class RestResponse<T> {
    private T data;

    public RestResponse(T result) {
        this.data = result;
    }

    public T getData() {
        return data;
    }
}
