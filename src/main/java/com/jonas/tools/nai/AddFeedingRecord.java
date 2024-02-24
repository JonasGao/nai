package com.jonas.tools.nai;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * @param time      喂养日期
 * @param operation 【枚举定义】喂养行为类型
 * @param value1    喂养数据
 * @param value2    喂养数据
 */
public record AddFeedingRecord(@NotNull LocalDate date, @NotNull LocalTime time, @NotNull Operation operation,
                               @NotNull Integer value1, Integer value2) {
    public FeedingRecord initFeedingRecord() {
        FeedingRecord feedingRecord = new FeedingRecord();
        feedingRecord.setDate(date);
        feedingRecord.setTime(time);
        feedingRecord.setOperation(operation);
        feedingRecord.setValue1(value1);
        feedingRecord.setValue2(value2);
        return feedingRecord;
    }
}
