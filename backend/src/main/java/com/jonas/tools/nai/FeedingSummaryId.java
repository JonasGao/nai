package com.jonas.tools.nai;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "view_feeding_summary")
public class FeedingSummaryId implements Serializable {
    /**
     * 喂养日期
     */
    @Id
    private LocalDate date;

    /**
     * 【枚举定义】喂养行为类型
     */
    @Id
    @Enumerated(EnumType.STRING)
    private Operation operation;

    public FeedingSummaryId() {
    }

    public FeedingSummaryId(LocalDate date, Operation operation) {
        this.date = date;
        this.operation = operation;
    }
}
