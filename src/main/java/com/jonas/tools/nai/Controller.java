package com.jonas.tools.nai;

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
}
