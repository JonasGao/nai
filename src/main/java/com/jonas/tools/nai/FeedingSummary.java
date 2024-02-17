package com.jonas.tools.nai;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
@Table(name = "view_feeding_summary")
@IdClass(FeedingSummaryId.class)
public class FeedingSummary implements Serializable {
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

    /**
     * 喂养数据
     */
    private Integer value1;

    /**
     * 喂养数据
     */
    private Integer value2;

    private Integer count;

    public FeedingSummary() {
    }

    public FeedingSummary(LocalDate date) {
        this.date = date;
    }

    public static FeedingSummary date(LocalDate date) {
        return new FeedingSummary(date);
    }
}
