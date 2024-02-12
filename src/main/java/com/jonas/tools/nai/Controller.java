package com.jonas.tools.nai;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    private final FeedingRecordService feedingRecordService;

    public Controller(FeedingRecordService feedingRecordService) {
        this.feedingRecordService = feedingRecordService;
    }

    @PostMapping("/api/feeding-record")
    public FeedingRecord addRecord(@RequestBody AddFeedingRecord addFeedingRecord) {
        return feedingRecordService.addOneRecord(addFeedingRecord);
    }

    @GetMapping("/api/feeding-records")
    public Page<FeedingRecord> getFeedingRecordPage(@PageableDefault(sort = {"date","time"}, direction = Sort.Direction.DESC) Pageable pageRequest) {
        return feedingRecordService.getFeedingRecordPage(pageRequest);
    }

    @DeleteMapping("/api/feeding-record/{id}")
    public void deleteFeedingRecord(@PathVariable("id") Integer id) {
        feedingRecordService.deleteOne(id);
    }
}
