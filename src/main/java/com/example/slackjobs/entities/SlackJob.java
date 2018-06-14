package com.example.slackjobs.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "slackjob")
public class SlackJob {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @Enumerated(EnumType.STRING)
    @NotNull
    public JobStatus jobStatus;

    @NotNull
    private Timestamp time;

    @NotNull
    public String channel;

    @NotNull
    public String message;

    public Long getTimestamp() {
        return time.getTime();
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

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
                "timestamp=" + getTimestamp() +
                ", name='" + message + '\'' +
                '}';
    }
}
