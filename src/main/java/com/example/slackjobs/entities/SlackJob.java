package com.example.slackjobs.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SlackJob {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private JobStatus jobStatus;


    public String timestamp;
    public String channel;
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
