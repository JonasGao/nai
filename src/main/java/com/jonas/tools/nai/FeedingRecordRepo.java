package com.jonas.tools.nai;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface FeedingRecordRepo extends JpaRepository<FeedingRecord, Integer> {

    List<FeedingRecord> findByDateIn(Collection<LocalDate> dates, Sort sort);

    List<RecordDate> findDistinctByDateLessThanEqual(LocalDate date, Pageable page);
}
