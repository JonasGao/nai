package com.jonas.tools.nai;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
public class DaysFeedingRecordParams {

    private int size = 3;

    private LocalDate start = LocalDate.now();
}
