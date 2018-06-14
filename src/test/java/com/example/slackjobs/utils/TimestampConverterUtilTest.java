package com.example.slackjobs.utils;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
public class TimestampConverterUtilTest {

    @Test
    public void parseStringTimestamp() throws Exception {
        TimestampConverter timestampConverter = new TimestampConverter();
        Timestamp timestamp = timestampConverter.convertString("1408737771580");

        assertEquals(1408737771580l, timestamp.getTime());
    }

    @Test(expected = Exception.class)
    public void throwExceptionWhenInvalidTimestampProvided() throws Exception {
        TimestampConverter timestampConverter = new TimestampConverter();
        Timestamp timestamp = timestampConverter.convertString("some_bad_timestamp");
    }
}
