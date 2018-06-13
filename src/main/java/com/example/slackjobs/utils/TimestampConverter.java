package com.example.slackjobs.utils;

import java.sql.Timestamp;
import java.util.Date;

public class TimestampConverter {
    public Timestamp convertString(String stringTimestamp) throws Exception {
        Long timestampNumber = Long.parseLong(stringTimestamp);
        Date date = new Date(timestampNumber);

        return new Timestamp(date.getTime());
    }
}
