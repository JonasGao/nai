package com.jonas.tools.nai;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class DaysFeedingRecord {

    private LocalDate date;

    private List<FeedingRecord> records;

    private List<FeedingSummary> summary;

    public DaysFeedingRecord(LocalDate key, List<FeedingRecord> value, List<FeedingSummary> feedingSummary) {
        date = key;
        records = value;
        summary = feedingSummary;
    }
}
