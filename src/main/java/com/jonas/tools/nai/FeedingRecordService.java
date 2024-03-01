package com.jonas.tools.nai;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
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

    public List<DaysFeedingRecord> getDaysFeedingRecords(DaysFeedingRecordParams params) {
        LocalDate start = params.getStart();
        PageRequest page = PageRequest.of(0, params.getSize(), Sort.by("date").descending());
        List<RecordDate> distinctByDateLessThanEqual;
        if (start == null) {
            log.info("start is null, query top {} records", params.getSize());
            distinctByDateLessThanEqual = feedingRecordRepo.findDistinct(page);
        } else {
            log.info("start is {}, query records before this date", start);
            distinctByDateLessThanEqual = feedingRecordRepo.findDistinctByDateLessThanEqual(start, page);
        }
        List<LocalDate> dates = distinctByDateLessThanEqual.stream().map(RecordDate::getDate).toList();
        log.info("distinct dates: {}", dates);
        List<FeedingRecord> records = feedingRecordRepo.findByDateIn(dates, Sort.by("date", "time").descending());
        List<FeedingSummary> summaries = feedingSummaryRepo.findByDateIn(dates, Sort.by("date").descending());
        Map<LocalDate, List<FeedingRecord>> recordMap = records.stream().collect(Collectors.groupingBy(FeedingRecord::getDate));
        Map<LocalDate, List<FeedingSummary>> summaryMap = summaries.stream().collect(Collectors.groupingBy(FeedingSummary::getDate));
        List<DaysFeedingRecord> result = new ArrayList<>();
        for (Map.Entry<LocalDate, List<FeedingRecord>> entry : recordMap.entrySet()) {
            result.add(new DaysFeedingRecord(entry.getKey(), entry.getValue(), summaryMap.get(entry.getKey())));
        }
        return result;
    }
}
