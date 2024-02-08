package com.jonas.tools.nai;

import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class FeedingRecordService {

    private final FeedingRecordRepo feedingRecordRepo;

    public FeedingRecordService(FeedingRecordRepo feedingRecordRepo) {
        this.feedingRecordRepo = feedingRecordRepo;
    }

    public FeedingRecord addOneRecord(AddFeedingRecord addFeedingRecord) {
        FeedingRecord feedingRecord = addFeedingRecord.initFeedingRecord();
        feedingRecord.setCreatorAndModifier("System");
        feedingRecord.setCreatedAndModified(new Date());
        feedingRecordRepo.save(feedingRecord);
        return feedingRecord;
    }
}
