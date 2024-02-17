package com.jonas.tools.nai;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class FeedingRecordService {

    private final FeedingRecordRepo feedingRecordRepo;
    private final FeedingSummaryRepo feedingSummaryRepo;

    public FeedingRecordService(FeedingRecordRepo feedingRecordRepo, FeedingSummaryRepo feedingSummaryRepo) {
        this.feedingRecordRepo = feedingRecordRepo;
        this.feedingSummaryRepo = feedingSummaryRepo;
    }

    public FeedingRecord addOneRecord(AddFeedingRecord addFeedingRecord) {
        FeedingRecord feedingRecord = addFeedingRecord.initFeedingRecord();
        feedingRecord.setCreatorAndModifier("System");
        feedingRecord.setCreatedAndModified(new Date());
        feedingRecordRepo.save(feedingRecord);
        return feedingRecord;
    }

    public Page<FeedingRecord> getFeedingRecordPage(Pageable pageable) {
        return feedingRecordRepo.findAll(pageable);
    }

    public void deleteOne(Integer id) {
     feedingRecordRepo.deleteById(id);
    }

    public void updateOne(FeedingRecord feedingRecord) {
        feedingRecordRepo.save(feedingRecord);
    }

    public List<FeedingSummary> getSummary(LocalDate date) {
        return feedingSummaryRepo.findAll(Example.of(FeedingSummary.date(date)));
    }
}
