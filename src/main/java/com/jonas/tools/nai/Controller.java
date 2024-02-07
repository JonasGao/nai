package com.jonas.tools.nai;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @PostMapping("/api/feeding-record")
    public void addRecord(@RequestBody FeedingRecord feedingRecord) {

    }
}
