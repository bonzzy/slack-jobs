package com.example.slackjobs.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class SlackJob {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @NotNull
    private JobStatus jobStatus;

    @NotNull
    public String timestamp;

    @NotNull
    public String channel;

    @NotNull
    public String message;

    public enum JobStatus {
        PENDING,
        FINISHED;
    }

    public SlackJob() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setJobStatus(JobStatus jobStatus) {
        this.jobStatus = jobStatus;
    }

    public boolean isSent() {
        return jobStatus.equals(JobStatus.FINISHED);
    }

    @Override
    public String toString() {
        return "SlackJob{" +
                "id=" + id +
                "channel=" + channel +
                "jobStatus=" + jobStatus +
                ", name='" + message + '\'' +
                '}';
    }
}
